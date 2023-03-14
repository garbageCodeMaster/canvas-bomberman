import { useRef, useEffect, useCallback } from 'react'
import { useAppDispatch } from '../../store/hooks'
import { bombermanScene } from './bombermanScene'
import { setStatus, GameStatus } from '../../store/gameSlice'
import { Game } from '../game/lib'
import { GameConfig } from './lib'

export function createGame(config: GameConfig) {
  return new Game(config)
}

export function useGame() {
  const canvasRef = useRef<null | HTMLCanvasElement>(null)
  const gameRef = useRef<null | Game>(null)
  const shouldRunSecondTime = useRef(true)
  const dispatch = useAppDispatch()

  /* рекурсивно вызывает саму себя? */
  const endGame = useCallback(() => {
    gameRef.current?.stop()
    dispatch(setStatus(GameStatus.END))
  }, [dispatch])

  const startGame = () => {
    if (!canvasRef.current) {
      return
    }

    gameRef.current = createGame({
      height: 640,
      width: 1280,
      backgroundColor: '#64b0ff',
      root: canvasRef.current,
      scene: bombermanScene,
      onGameEnd: endGame,
    })

    gameRef.current.start()
    dispatch(setStatus(GameStatus.START))
  }

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas || !shouldRunSecondTime.current) {
      return
    }

    shouldRunSecondTime.current = false

    gameRef.current = new Game({
      height: 640,
      width: 1280,
      backgroundColor: '#64b0ff',
      root: canvas,
      scene: bombermanScene,
      onGameEnd: endGame,
    })
  }, [endGame])

  return {
    endGame,
    startGame,
    canvasRef,
    gameRef,
  }
}
