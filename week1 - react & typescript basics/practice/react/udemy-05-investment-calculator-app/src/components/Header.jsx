import logo from "../assets/investment-calculator-logo.png"

export default function Header({id, ...props}) {

    return (
        <section id={id}>
            <img src={logo}></img>
            <h1>Investment Calculator</h1>
        </section>
    );
}