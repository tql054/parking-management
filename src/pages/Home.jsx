import { SideMap } from "../components"
import Context from "../store/Context"
import { useStore } from "../store/hooks"

const Home = () => {
    const [state, dispatch] = useStore(Context)
    console.log(state)
    return (
        <section>
            <SideMap/>
        </section>
    )
}

export default Home