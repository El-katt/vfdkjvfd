import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { PokemonListItem, PokemonDetails } from "../../types/pokemon"

interface PokemonState {
    pokemonList: PokemonListItem[]
    loading: boolean
    error: string | null
    offset: number
    hasMore: boolean
    selectedPokemon: number | null
    selectedPokemonDetails: PokemonDetails | null
    loadingDetails: boolean
}

const initialState: PokemonState = {
    pokemonList: [],
    loading: false,
    error: null,
    offset: 0,
    hasMore: true,
    selectedPokemon: null,
    selectedPokemonDetails: null,
    loadingDetails: false,
}

const pokemonSlice = createSlice({
    name: "pokemon",
    initialState,
    reducers: {
        fetchPokemonList: (state, action: PayloadAction<number>) => {
            state.loading = true
            state.error = null
        },
        fetchPokemonListSuccess: (state, action: PayloadAction<{ pokemonList: PokemonListItem[]; hasMore: boolean }>) => {
            state.pokemonList = [...state.pokemonList, ...action.payload.pokemonList]
            state.loading = false
            state.offset = state.offset + 20
            state.hasMore = action.payload.hasMore
        },
        fetchPokemonListFailure: (state, action: PayloadAction<string>) => {
            state.loading = false
            state.error = action.payload
        },
        selectPokemon: (state, action: PayloadAction<number>) => {
            state.selectedPokemon = action.payload
            state.loadingDetails = true
        },
        fetchPokemonDetailsSuccess: (state, action: PayloadAction<PokemonDetails>) => {
            state.selectedPokemonDetails = action.payload
            state.loadingDetails = false
        },
        fetchPokemonDetailsFailure: (state, action: PayloadAction<string>) => {
            state.loadingDetails = false
            state.error = action.payload
        },
        clearSelectedPokemon: (state) => {
            state.selectedPokemon = null
            state.selectedPokemonDetails = null
        },
    },
})

export const {
    fetchPokemonList,
    fetchPokemonListSuccess,
    fetchPokemonListFailure,
    selectPokemon,
    fetchPokemonDetailsSuccess,
    fetchPokemonDetailsFailure,
    clearSelectedPokemon,
} = pokemonSlice.actions

export default pokemonSlice.reducer

