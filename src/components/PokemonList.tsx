"use client"

import { useEffect, useRef, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPokemonList, selectPokemon } from "../features/pokemon/PokemonSlice"
import type { RootState } from "../store"
import { Skeleton } from "./ui/Skeleton"
import "./PokemonList.css"

export default function PokemonList() {
    const dispatch = useDispatch()
    const { pokemonList, loading, hasMore, offset, error } = useSelector((state: RootState) => state.pokemon)
    const observer = useRef<IntersectionObserver | null>(null)

    useEffect(() => {
        console.log("Dispatching initial fetch")
        dispatch(fetchPokemonList(0))
    }, [dispatch])

    const lastPokemonRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (loading) return

            if (observer.current) observer.current.disconnect()

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    console.log("Loading more Pokemon, offset:", offset)
                    dispatch(fetchPokemonList(offset))
                }
            })

            if (node) observer.current.observe(node)
        },
        [loading, hasMore, offset, dispatch],
    )

    const handlePokemonClick = (id: number) => {
        dispatch(selectPokemon(id))
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>
    }

    return (
        <div className="pokemon-grid">
            {pokemonList.map((pokemon, index) => (
                <div
                    key={pokemon.id}
                    className="pokemon-card"
                    onClick={() => handlePokemonClick(pokemon.id)}
                    ref={index === pokemonList.length - 1 ? lastPokemonRef : undefined}
                    data-testid={`pokemon-card-${pokemon.id}`}
                >
                    <div className="pokemon-card-content">
                        <div className="pokemon-image-container">
                            <img
                                src={
                                    pokemon.sprites.front_default ||
                                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
                                }
                                alt={pokemon.name}
                                className="pokemon-image"
                                loading="lazy"
                            />
                        </div>
                        <h2 className="pokemon-name">{pokemon.name}</h2>
                        <div className="pokemon-types">
                            {pokemon.types.map((type) => (
                                <span key={type.type.name} className={`pokemon-type ${type.type.name}`}>
                  {type.type.name}
                </span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}

            {loading && (
                <>
                    {[...Array(8)].map((_, i) => (
                        <div key={`skeleton-${i}`} className="pokemon-card">
                            <div className="pokemon-card-content">
                                <Skeleton className="pokemon-image-skeleton" />
                                <Skeleton className="pokemon-name-skeleton" />
                                <div className="pokemon-types">
                                    <Skeleton className="pokemon-type-skeleton" />
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}

