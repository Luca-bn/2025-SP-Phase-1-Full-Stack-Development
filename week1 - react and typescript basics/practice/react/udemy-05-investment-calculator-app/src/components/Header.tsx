import logo from "../assets/investment-calculator-logo.png"

type HeaderProps = {
    id: string,
    props?: unknown[]
}

export default function Header({ id, ...props }: HeaderProps) {

    return (
        <section id={id}>
            <img src={logo}></img>
            <h1>Investment Calculator</h1>
        </section>
    );
}