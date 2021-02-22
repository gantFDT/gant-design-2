import type React from 'react';
import { useEffect, useCallback, useRef } from 'react';

export type OnDragFunc = (c: { x: number; y: number }) => void;

function useDrag(x: number, y: number, onDrag: OnDragFunc) {
  const isDragging = useRef(false);
  const initialDragState = useRef({
    initX: 0,
    initY: 0,
    mouseDownX: 0,
    mouseDownY: 0,
  });

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setTextSelectable(false);
      initialDragState.current = {
        initX: x,
        initY: y,
        mouseDownX: e.clientX,
        mouseDownY: e.clientY,
      };
      isDragging.current = true;
    },
    [x, y],
  );

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging.current) {
        const { initX, mouseDownX, initY, mouseDownY } = initialDragState.current;
        const dx = e.clientX - mouseDownX;
        const dy = e.clientY - mouseDownY;
        const _x = initX + dx;
        const _y = initY + dy;
        onDrag({ x: _x, y: _y });
      }
    },
    [onDrag],
  );

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  useEffect(() => {
    const onMouseUp = () => {
      isDragging.current = false;
      setTextSelectable(true);
    };
    window.addEventListener('mouseup', onMouseUp);
    return () => window.removeEventListener('mouseup', onMouseUp);
  }, []);

  return onMouseDown;
}

export type OnResizeFunc = (c: { x: number; y: number; width: number; height: number }) => void;

function useResize(x: number, y: number, width: number, height: number, onResize: OnResizeFunc) {
  const isDragging = useRef(false);
  const initialDragState = useRef({
    initX: 0,
    initY: 0,
    initWidth: 0,
    initHeight: 0,
    mouseDownX: 0,
    mouseDownY: 0,
  });

  const onMouseDown = useCallback(
    (e) => {
      e.stopPropagation();
      setTextSelectable(false);
      initialDragState.current = {
        initX: x,
        initY: y,
        initWidth: width,
        initHeight: height,
        mouseDownX: e.clientX,
        mouseDownY: e.clientY,
      };
      isDragging.current = true;
    },
    [width, height, x, y],
  );

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging.current) {
        const { initX, initY, initWidth, mouseDownX, initHeight, mouseDownY } = initialDragState.current;
        const dx = e.clientX - mouseDownX;
        const dy = e.clientY - mouseDownY;
        const _width = initWidth + dx;
        const _height = initHeight + dy;
        return onResize({ x: initX, y: initY, width: _width, height: _height });
      }
    },
    [initialDragState, onResize],
  );

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [onMouseMove]);

  useEffect(() => {
    const onMouseUp = () => {
      isDragging.current = false;
      setTextSelectable(true);
    };
    window.addEventListener('mouseup', onMouseUp);
    return () => window.removeEventListener('mouseup', onMouseUp);
  }, []);

  return onMouseDown;
}

function usePrev(value?: boolean) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function setTextSelectable(selectable: boolean) {
  document.onselectstart = () => selectable;
}

export { useDrag, useResize, usePrev };
