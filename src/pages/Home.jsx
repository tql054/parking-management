import { SideMap } from "../components"

const Home = () => {
    const aArray = [
        {
            tenodo: 'abc',
            ma: 'd'
        },
        {
            tenodo: 'edf',
            ma: 'k'
        }
    ]

    const bArray = [
        {
            tenodo: 'abc',
            ma: 'd'
        },
        {
            tenodo: 'edf',
            ma: 'k'
        }
    ]

    
    console.log([...aArray, ...bArray])
    return (
        <section>
            <SideMap/>
            
        </section>
    )
}

export default Home