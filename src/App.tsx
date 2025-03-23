import { Provider } from "react-redux"
import { store } from "./store"
import PokemonList from "./components/PokemonList"
import PokemonModal from "./components/PokemonModal"
import "./App.css"

function App() {
    return (
        <Provider store={store}>
            <div className="container">
                <h1>Pokémon Explorer</h1>
                <PokemonList />
                <PokemonModal />
            </div>
        </Provider>
    )
}

export default App

