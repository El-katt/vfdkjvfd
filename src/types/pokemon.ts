export interface PokemonListResponse {
    count: number
    next: string | null
    previous: string | null
    results: {
        name: string
        url: string
    }[]
}

export interface PokemonListItem {
    id: number
    name: string
    sprites: {
        front_default: string | null
    }
    types: {
        slot: number
        type: {
            name: string
            url: string
        }
    }[]
}

export interface PokemonDetails {
    id: number
    name: string
    height: number
    weight: number
    base_experience: number
    sprites: {
        front_default: string | null
        other: {
            "official-artwork": {
                front_default: string | null
            }
        }
    }
    types: {
        slot: number
        type: {
            name: string
            url: string
        }
    }[]
    stats: {
        base_stat: number
        effort: number
        stat: {
            name: string
            url: string
        }
    }[]
    abilities: {
        ability: {
            name: string
            url: string
        }
        is_hidden: boolean
        slot: number
    }[]
    moves: {
        move: {
            name: string
            url: string
        }
    }[]
}

