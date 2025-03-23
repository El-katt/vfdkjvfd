import { configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"
import { all, fork } from "redux-saga/effects"
import pokemonReducer from "./features/pokemon/PokemonSlice"
import { pokemonSaga } from "./features/pokemon/PokemonSaga"

const sagaMiddleware = createSagaMiddleware()

function* rootSaga() {
    yield all([fork(pokemonSaga)])
}

export const store = configureStore({
    reducer: {
        pokemon: pokemonReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: false,
            serializableCheck: false,
        }).concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

