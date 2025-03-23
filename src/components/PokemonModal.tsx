"use client"

import type React from "react"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearSelectedPokemon } from "../features/pokemon/PokemonSlice"
import type { RootState } from "../store"
import { Skeleton } from "./ui/Skeleton"
import "./PokemonModal.css"

export default function PokemonModal() {
    const dispatch = useDispatch()
    const { selectedPokemon, selectedPokemonDetails, loadingDetails } = useSelector((state: RootState) => state.pokemon)

    const handleClose = () => {
        dispatch(clearSelectedPokemon())
    }

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                handleClose()
            }
        }

        if (selectedPokemon !== null) {
            document.addEventListener("keydown", handleEscape)
            document.body.style.overflow = "hidden"
        }

        return () => {
            document.removeEventListener("keydown", handleEscape)
            document.body.style.overflow = ""
        }
    }, [selectedPokemon])

    if (selectedPokemon === null) {
        return null
    }

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            handleClose()
        }
    }

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick} data-testid="pokemon-modal">
            <div className="modal-content">
                {loadingDetails ? (
                    <div className="modal-loading">
                        <Skeleton className="modal-image-skeleton" />
                        <Skeleton className="modal-title-skeleton" />
                        <Skeleton className="modal-text-skeleton" />
                        <Skeleton className="modal-text-skeleton" />
                    </div>
                ) : selectedPokemonDetails ? (
                    <>
                        <div className="modal-header">
                            <h2 className="modal-title">
                                {selectedPokemonDetails.name} #{selectedPokemonDetails.id}
                            </h2>
                            <button className="modal-close" onClick={handleClose}>
                                ×
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="pokemon-details-left">
                                <img
                                    src={
                                        selectedPokemonDetails.sprites.other["official-artwork"].front_default ||
                                        selectedPokemonDetails.sprites.front_default ||
                                        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
                                    }
                                    alt={selectedPokemonDetails.name}
                                    className="pokemon-detail-image"
                                />
                                <div className="pokemon-detail-types">
                                    {selectedPokemonDetails.types.map((type) => (
                                        <span key={type.type.name} className={`pokemon-type ${type.type.name}`}>
                      {type.type.name}
                    </span>
                                    ))}
                                </div>
                                <div className="pokemon-detail-attributes">
                                    <div className="pokemon-detail-attribute">
                                        <p className="attribute-label">Height</p>
                                        <p className="attribute-value">{selectedPokemonDetails.height / 10}m</p>
                                    </div>
                                    <div className="pokemon-detail-attribute">
                                        <p className="attribute-label">Weight</p>
                                        <p className="attribute-value">{selectedPokemonDetails.weight / 10}kg</p>
                                    </div>
                                    <div className="pokemon-detail-attribute">
                                        <p className="attribute-label">Base Experience</p>
                                        <p className="attribute-value">{selectedPokemonDetails.base_experience}</p>
                                    </div>
                                    <div className="pokemon-detail-attribute">
                                        <p className="attribute-label">Abilities</p>
                                        <p className="attribute-value capitalize">
                                            {selectedPokemonDetails.abilities.map((a) => a.ability.name).join(", ")}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="pokemon-details-right">
                                <div className="tabs">
                                    <div className="tab-list" role="tablist">
                                        <button
                                            id="tab-stats"
                                            className="tab active"
                                            role="tab"
                                            aria-selected="true"
                                            onClick={() => {
                                                document.getElementById("tab-stats")?.classList.add("active")
                                                document.getElementById("tab-moves")?.classList.remove("active")
                                                document.getElementById("tab-content-stats")?.classList.add("active")
                                                document.getElementById("tab-content-moves")?.classList.remove("active")
                                            }}
                                        >
                                            Stats
                                        </button>
                                        <button
                                            id="tab-moves"
                                            className="tab"
                                            role="tab"
                                            aria-selected="false"
                                            onClick={() => {
                                                document.getElementById("tab-stats")?.classList.remove("active")
                                                document.getElementById("tab-moves")?.classList.add("active")
                                                document.getElementById("tab-content-stats")?.classList.remove("active")
                                                document.getElementById("tab-content-moves")?.classList.add("active")
                                            }}
                                        >
                                            Moves
                                        </button>
                                    </div>
                                    <div className="tab-content">
                                        <div
                                            id="tab-content-stats"
                                            className="tab-panel active"
                                            role="tabpanel"
                                            aria-labelledby="tab-stats"
                                        >
                                            {selectedPokemonDetails.stats.map((stat) => (
                                                <div key={stat.stat.name} className="stat-item">
                                                    <div className="stat-header">
                                                        <span className="stat-name">{stat.stat.name.replace("-", " ")}</span>
                                                        <span className="stat-value">{stat.base_stat}</span>
                                                    </div>
                                                    <div className="stat-bar">
                                                        <div
                                                            className="stat-bar-fill"
                                                            style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                                                            role="progressbar"
                                                            aria-valuenow={stat.base_stat}
                                                            aria-valuemin={0}
                                                            aria-valuemax={255}
                                                        ></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div id="tab-content-moves" className="tab-panel" role="tabpanel" aria-labelledby="tab-moves">
                                            <div className="moves-list">
                                                {selectedPokemonDetails.moves.slice(0, 20).map((move) => (
                                                    <span key={move.move.name} className="move-item">
                            {move.move.name.replace("-", " ")}
                          </span>
                                                ))}
                                                {selectedPokemonDetails.moves.length > 20 && (
                                                    <p className="moves-more">+ {selectedPokemonDetails.moves.length - 20} more moves</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    )
}

