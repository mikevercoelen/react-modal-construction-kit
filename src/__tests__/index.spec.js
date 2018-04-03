import {
  Modal,
  Portal,
  Overlay
} from '../index'

describe('index', () => {
  it('should export Modal', () => {
    expect(typeof Modal).toBe('function')
  })

  it('should export Portal', () => {
    expect(typeof Portal).toBe('function')
  })

  it('should export Overlay', () => {
    expect(typeof Overlay).toBe('function')
  })
})
