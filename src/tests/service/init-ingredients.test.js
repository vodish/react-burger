import store from "../../services/redux"

describe('redux state tests', () => {
  it('Redux init ingredients', () => {
    const state = store.getState()
    expect(state.ingredients.list).toEqual([])
  })
})