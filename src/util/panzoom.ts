// Copied from 'https://github.com/svgdotjs/svg.panzoom.js' to make it work over here...

import { Svg, on, off, extend, Matrix, Box } from '@svgdotjs/svg.js'
import { TouchEvent, TouchList } from 'react'

export enum MouseButton {
    left = 0,
    middle,
    right,
    back,
    forth
}

interface MarginOptions {
    left: number
    top: number
    right: number
    bottom: number
}

interface Options {
    panning?: boolean
    pinchZoom?: boolean
    wheelZoom?: boolean
    panButton?: MouseButton
    oneFingerPan?: boolean
    margins?: boolean | MarginOptions
    zoomFactor?: number
    zoomMin?: number
    zoomMax?: number
    wheelZoomDeltaModeLinePixels?: number
    wheelZoomDeltaModeScreenPixels?: number
}

declare module '@svgdotjs/svg.js' {
    interface Svg {
            panZoom(options?: Options | false): this
    }
}

const normalizeEvent = (ev: PointerEvent | TouchEvent | Event) =>
    (ev as TouchEvent).touches || [{ clientX: (ev as PointerEvent).clientX, clientY: (ev as PointerEvent).clientY }]

extend(Svg, {
    panZoom (options?: Options | false) {
        const fixThis = (this as Svg);

        fixThis.off('.panZoom')

        // when called with false, disable panZoom
        if (options === false) return fixThis

        options = options ?? {}
        const zoomFactor = options.zoomFactor ?? 2
        const zoomMin = options.zoomMin ?? Number.MIN_VALUE
        const zoomMax = options.zoomMax ?? Number.MAX_VALUE
        const doWheelZoom = options.wheelZoom ?? true
        const doPinchZoom = options.pinchZoom ?? true
        const doPanning = options.panning ?? true
        const panButton = options.panButton ?? 0
        const oneFingerPan = options.oneFingerPan ?? false
        const margins = options.margins ?? false
        const wheelZoomDeltaModeLinePixels = options.wheelZoomDeltaModeLinePixels ?? 17
        const wheelZoomDeltaModeScreenPixels = options.wheelZoomDeltaModeScreenPixels ?? 53

        let lastP: { x: number, y: number }
        let lastTouches: TouchList
        let zoomInProgress = false

        const viewbox = fixThis.viewbox()

        const restrictToMargins = (box: Box) => {
            if (!margins) return box
            const { top, left, bottom, right } = (margins as MarginOptions)


            const { width, height } = (fixThis.attr(['width', 'height']) as { width: number, height: number })
            const preserveAspectRatio = fixThis.node.preserveAspectRatio.baseVal

            // The current viewport (exactly what is shown on the screen, what we ultimately want to restrict)
            // is not always exactly the same as current viewbox. They are different when the viewbox aspectRatio and the svg aspectRatio
            // are different and preserveAspectRatio is not "none". These offsets represent the difference in user coordinates
            // between the side of the viewbox and the side of the viewport.
            let viewportLeftOffset = 0
            let viewportRightOffset = 0
            let viewportTopOffset = 0
            let viewportBottomOffset = 0

            // preserveAspectRatio none has no offsets
            if (preserveAspectRatio.align !== preserveAspectRatio.SVG_PRESERVEASPECTRATIO_NONE) {
                const svgAspectRatio = width / height
                const viewboxAspectRatio = viewbox.width / viewbox.height
                // when aspectRatios are the same, there are no offsets
                if (viewboxAspectRatio !== svgAspectRatio) {
                    // aspectRatio unknown is like meet because that's the default
                    const isMeet = preserveAspectRatio.meetOrSlice !== preserveAspectRatio.SVG_MEETORSLICE_SLICE
                    const changedAxis = svgAspectRatio > viewboxAspectRatio ? 'width' : 'height'
                    const isWidth = changedAxis === 'width'
                    const changeHorizontal = (isMeet && isWidth) || (!isMeet && !isWidth)
                    const ratio = changeHorizontal
                        ? svgAspectRatio / viewboxAspectRatio
                        : viewboxAspectRatio / svgAspectRatio

                    const offset = box[changedAxis] - box[changedAxis] * ratio
                    if (changeHorizontal) {
                        if (
                            preserveAspectRatio.align === preserveAspectRatio.SVG_PRESERVEASPECTRATIO_XMIDYMIN ||
                            preserveAspectRatio.align === preserveAspectRatio.SVG_PRESERVEASPECTRATIO_XMIDYMID ||
                            preserveAspectRatio.align === preserveAspectRatio.SVG_PRESERVEASPECTRATIO_XMIDYMAX) {
                            viewportLeftOffset = offset / 2
                            viewportRightOffset = -offset / 2
                        } else if (
                            preserveAspectRatio.align === preserveAspectRatio.SVG_PRESERVEASPECTRATIO_XMINYMIN ||
                            preserveAspectRatio.align === preserveAspectRatio.SVG_PRESERVEASPECTRATIO_XMINYMID ||
                            preserveAspectRatio.align === preserveAspectRatio.SVG_PRESERVEASPECTRATIO_XMINYMAX) {
                            viewportRightOffset = -offset
                        } else if (
                            preserveAspectRatio.align === preserveAspectRatio.SVG_PRESERVEASPECTRATIO_XMAXYMIN ||
                            preserveAspectRatio.align === preserveAspectRatio.SVG_PRESERVEASPECTRATIO_XMAXYMID ||
                            preserveAspectRatio.align === preserveAspectRatio.SVG_PRESERVEASPECTRATIO_XMAXYMAX) {
                            viewportLeftOffset = offset
                        }
                    } else {
                        if (
                            preserveAspectRatio.align === preserveAspectRatio.SVG_PRESERVEASPECTRATIO_XMINYMID ||
                            preserveAspectRatio.align === preserveAspectRatio.SVG_PRESERVEASPECTRATIO_XMIDYMID ||
                            preserveAspectRatio.align === preserveAspectRatio.SVG_PRESERVEASPECTRATIO_XMAXYMID) {
                            viewportTopOffset = offset / 2
                            viewportBottomOffset = -offset / 2
                        } else if (
                            preserveAspectRatio.align === preserveAspectRatio.SVG_PRESERVEASPECTRATIO_XMINYMIN ||
                            preserveAspectRatio.align === preserveAspectRatio.SVG_PRESERVEASPECTRATIO_XMIDYMIN ||
                            preserveAspectRatio.align === preserveAspectRatio.SVG_PRESERVEASPECTRATIO_XMAXYMIN) {
                            viewportBottomOffset = -offset
                        } else if (
                            preserveAspectRatio.align === preserveAspectRatio.SVG_PRESERVEASPECTRATIO_XMINYMAX ||
                            preserveAspectRatio.align === preserveAspectRatio.SVG_PRESERVEASPECTRATIO_XMIDYMAX ||
                            preserveAspectRatio.align === preserveAspectRatio.SVG_PRESERVEASPECTRATIO_XMAXYMAX) {
                            viewportTopOffset = offset
                        }
                    }

                }
            }

            // when box.x == leftLimit, the image is panned to the left,
            // i.e the current box is to the right of the initial viewbox,
            // and only the right part of the initial image is visible, i.e.
            // the right side of the initial viewbox minus left margin (viewbox.x+viewbox.width-left)
            // is aligned with the left side of the viewport (box.x + viewportLeftOffset):
            // viewbox.width + viewbox.x - left = box.x + viewportLeftOffset
            // viewbox.width + viewbox.x - left - viewportLeftOffset = box.x (= leftLimit)
            const leftLimit = viewbox.width + viewbox.x - left - viewportLeftOffset
            // when box.x == rightLimit, the image is panned to the right,
            // i.e the current box is to the left of the initial viewbox
            // and only the left part of the initial image is visible, i.e
            // the left side of the initial viewbox plus right margin (viewbox.x + right)
            // is aligned with the right side of the viewport (box.x + box.width + viewportRightOffset)
            // viewbox.x + right = box.x + box.width + viewportRightOffset
            // viewbox.x + right - box.width - viewportRightOffset = box.x (= rightLimit)
            const rightLimit = viewbox.x + right - box.width - viewportRightOffset
            // same with top and bottom
            const topLimit = viewbox.height + viewbox.y - top - viewportTopOffset
            const bottomLimit = viewbox.y + bottom - box.height - viewportBottomOffset

            box.x = Math.min(leftLimit, Math.max(rightLimit, box.x)) // enforce rightLimit <= box.x <= leftLimit
            box.y = Math.min(topLimit, Math.max(bottomLimit, box.y)) // enforce bottomLimit <= box.y <= topLimit
            return box
        }

        const wheelZoom = function (ev: WheelEvent) {
            ev.preventDefault()

            // When wheeling on a mouse,
            // - chrome by default uses deltaY = 53, deltaMode = 0 (pixel)
            // - firefox by default uses deltaY = 3, deltaMode = 1 (line)
            // - chrome and firefox on windows after configuring "One screen at a time"
            //   use deltaY = 1, deltaMode = 2 (screen)
            //
            // Note that when when wheeling on a touchpad, deltaY depends on how fast
            // you swipe, but the deltaMode is still different between the browsers.
            //
            // Normalize everything so that zooming speed is approximately the same in all cases
            let normalizedPixelDeltaY
            switch (ev.deltaMode) {
            case 1:
                normalizedPixelDeltaY = ev.deltaY * wheelZoomDeltaModeLinePixels
                break
            case 2:
                normalizedPixelDeltaY = ev.deltaY * wheelZoomDeltaModeScreenPixels
                break
            default:
                // 0 (already pixels) or new mode (avoid crashing)
                normalizedPixelDeltaY = ev.deltaY
                break
            }

            let lvl = Math.pow(1 + zoomFactor, (-1 * normalizedPixelDeltaY) / 100) * fixThis.zoom()
            const p = fixThis.point(ev.clientX, ev.clientY)

            if (lvl > zoomMax) {
                lvl = zoomMax
            }

            if (lvl < zoomMin) {
                lvl = zoomMin
            }

            if (fixThis.dispatch('zoom', { level: lvl, focus: p }).defaultPrevented) {
                return fixThis
            }

            fixThis.zoom(lvl, p)

            if (margins) {
                const box = restrictToMargins(fixThis.viewbox())
                fixThis.viewbox(box)
            }
        }

        const pinchZoomStart = function (ev: TouchEvent) {
            lastTouches = normalizeEvent(ev)

            // Start panning in case only one touch is found
            if (lastTouches.length < 2) {
                if (doPanning && oneFingerPan) {
                    panStart.call(fixThis, (ev as unknown as Event))
                }
                return
            }

            // Stop panning for more than one touch
            if (doPanning && oneFingerPan) {
                panStop.call(fixThis, (ev as unknown as Event))
            }

            // We call it so late, so the user is still able to scroll / reload the page via gesture
            // In case oneFingerPan is not active
            ev.preventDefault()

            if (fixThis.dispatch('pinchZoomStart', { event: ev }).defaultPrevented) {
                return
            }

            fixThis.off('touchstart.panZoom', (pinchZoomStart as unknown as EventListener))

            zoomInProgress = true
            on(document, 'touchmove.panZoom', (pinchZoom as unknown as EventListener), fixThis, { passive: false })
            on(document, 'touchend.panZoom', (pinchZoomStop as unknown as EventListener), fixThis, { passive: false })
        }

        const pinchZoomStop = function (ev: TouchEvent) {
            ev.preventDefault()

            const currentTouches = normalizeEvent(ev)
            if (currentTouches.length > 1) {
                return
            }

            zoomInProgress = false

            fixThis.dispatch('pinchZoomEnd', { event: ev })

            off(document, 'touchmove.panZoom', pinchZoom as unknown as EventListener)
            off(document, 'touchend.panZoom', pinchZoomStop as unknown as EventListener)
            fixThis.on('touchstart.panZoom', pinchZoomStart as unknown as EventListener)

            if (currentTouches.length && doPanning && oneFingerPan) {
                panStart.call(fixThis, (ev as unknown as Event))
            }
        }

        const pinchZoom = function (ev: TouchEvent) {
            ev.preventDefault()

            const currentTouches = normalizeEvent(ev)
            const zoom = fixThis.zoom()

            // Distance Formula
            const lastDelta = Math.sqrt(
                Math.pow(lastTouches[0].clientX - lastTouches[1].clientX, 2) +
                    Math.pow(lastTouches[0].clientY - lastTouches[1].clientY, 2)
            )

            const currentDelta = Math.sqrt(
                Math.pow(currentTouches[0].clientX - currentTouches[1].clientX, 2) +
                    Math.pow(currentTouches[0].clientY - currentTouches[1].clientY, 2)
            )

            let zoomAmount = lastDelta / currentDelta

            if (
                (zoom < zoomMin && zoomAmount > 1) ||
                (zoom > zoomMax && zoomAmount < 1)
            ) {
                zoomAmount = 1
            }

            const currentFocus = {
                x:
                    currentTouches[0].clientX +
                    0.5 * (currentTouches[1].clientX - currentTouches[0].clientX),
                y:
                    currentTouches[0].clientY +
                    0.5 * (currentTouches[1].clientY - currentTouches[0].clientY)
            }

            const lastFocus = {
                x:
                    lastTouches[0].clientX +
                    0.5 * (lastTouches[1].clientX - lastTouches[0].clientX),
                y:
                    lastTouches[0].clientY +
                    0.5 * (lastTouches[1].clientY - lastTouches[0].clientY)
            }

            const p = fixThis.point(currentFocus.x, currentFocus.y)
            const focusP = fixThis.point(
                2 * currentFocus.x - lastFocus.x,
                2 * currentFocus.y - lastFocus.y
            )
            const box = new Box(fixThis.viewbox()).transform(
                new Matrix()
                    .translate(-focusP.x, -focusP.y)
                    .scale(zoomAmount, 0, 0)
                    .translate(p.x, p.y)
            )

            restrictToMargins(box)
            fixThis.viewbox(box)

            lastTouches = currentTouches

            fixThis.dispatch('zoom', { box: box, focus: focusP })
        }

        const panStart = function (ev: Event | PointerEvent) {
            const isMouse = ev.type.indexOf('mouse') > -1

            // In case panStart is called with touch, ev.button is undefined
            if (isMouse && (ev as PointerEvent).button !== panButton && (ev as PointerEvent).which !== panButton + 1) {
                return
            }

            ev.preventDefault()

            fixThis.off('mousedown.panZoom', panStart)

            lastTouches = normalizeEvent(ev)

            if (zoomInProgress) return

            fixThis.dispatch('panStart', { event: ev })

            lastP = { x: lastTouches[0].clientX, y: lastTouches[0].clientY }

            on(document, 'touchmove.panZoom mousemove.panZoom', panning as EventListener, fixThis, {
                passive: false
            })

            on(document, 'touchend.panZoom mouseup.panZoom', panStop, fixThis, {
                passive: false
            })
        }

        const panStop = function (ev: Event) {
            ev.preventDefault()

            off(document, 'touchmove.panZoom mousemove.panZoom', panning as EventListener)
            off(document, 'touchend.panZoom mouseup.panZoom', panStop)
            fixThis.on('mousedown.panZoom', panStart)

            fixThis.dispatch('panEnd', { event: ev })
        }

        const panning = function (ev: PointerEvent | TouchEvent) {
            ev.preventDefault()

            const currentTouches = normalizeEvent(ev)

            const currentP = {
                x: currentTouches[0].clientX,
                y: currentTouches[0].clientY
            }

            const p1 = fixThis.point(currentP.x, currentP.y)

            const p2 = fixThis.point(lastP.x, lastP.y)

            const deltaP = [p2.x - p1.x, p2.y - p1.y]

            if (!deltaP[0] && !deltaP[1]) {
                return
            }

            const box = new Box(fixThis.viewbox()).transform(
                new Matrix().translate(deltaP[0], deltaP[1])
            )

            lastP = currentP

            restrictToMargins(box)

            if (fixThis.dispatch('panning', { box, event: ev }).defaultPrevented) {
                return
            }

            fixThis.viewbox(box)
        }

        if (doWheelZoom) {
            fixThis.on('wheel.panZoom', (wheelZoom  as unknown as EventListener), fixThis, { passive: false })
        }

        if (doPinchZoom) {
            fixThis.on('touchstart.panZoom', (pinchZoomStart  as unknown as EventListener), fixThis, { passive: false })
        }

        if (doPanning) {
            fixThis.on('mousedown.panZoom', panStart, fixThis, { passive: false })
        }

        return fixThis
    }
})
