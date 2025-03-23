import { call, put, takeLatest } from "redux-saga/effects"
import type { PayloadAction } from "@reduxjs/toolkit"
import {
    fetchPokemonList,
    fetchPokemonListSuccess,
    fetchPokemonListFailure,
    selectPokemon,
    fetchPokemonDetailsSuccess,
    fetchPokemonDetailsFailure,
} from "./PokemonSlice"
import type { PokemonListItem, PokemonDetails, PokemonListResponse } from "../../types/pokemon"

function fetchPokemonListFromApi(offset: number) {
    return fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`).then((response) => {
        if (!response.ok) {
            throw new Error("Failed to fetch Pokemon list")
        }
        return response.json()
    })
}

function fetchPokemonDetailsFromApi(url: string) {
    return fetch(url).then((response) => {
        if (!response.ok) {
            throw new Error("Failed to fetch Pokemon details")
        }
        return response.json()
    })
}

function* fetchPokemonListSaga(action: PayloadAction<number>) {
    try {
        const offset = action.payload
        const data: PokemonListResponse = yield call(fetchPokemonListFromApi, offset)

        const detailsPromises = data.results.map((pokemon) => fetchPokemonDetailsFromApi(pokemon.url))

        const pokemonDetails: PokemonDetails[] = yield call(() => Promise.all(detailsPromises))

        const pokemonList: PokemonListItem[] = pokemonDetails.map((pokemon) => ({
            id: pokemon.id,
            name: pokemon.name,
            sprites: {
                front_default: pokemon.sprites.front_default,
            },
            types: pokemon.types,
        }))

        yield put(
            fetchPokemonListSuccess({
                pokemonList,
                hasMore: !!data.next,
            }),
        )
    } catch (error) {
        console.error("Error fetching Pokemon list:", error)
        yield put(fetchPokemonListFailure(error instanceof Error ? error.message : "An unknown error occurred"))
    }
}

function* fetchPokemonDetailsSaga(action: PayloadAction<number>) {
    try {
        const pokemonId = action.payload
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
        const pokemonDetails: PokemonDetails = yield call(() => fetchPokemonDetailsFromApi(url))
        yield put(fetchPokemonDetailsSuccess(pokemonDetails))
    } catch (error) {
        console.error("Error fetching Pokemon details:", error)
        yield put(fetchPokemonDetailsFailure(error instanceof Error ? error.message : "An unknown error occurred"))
    }
}

export function* pokemonSaga() {
    yield takeLatest(fetchPokemonList.type, fetchPokemonListSaga)
    yield takeLatest(selectPokemon.type, fetchPokemonDetailsSaga)
}

