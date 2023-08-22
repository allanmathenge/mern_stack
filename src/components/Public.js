import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">Allan Mathenge Web!</span></h1>
            </header>
            <main className="public__main">
                <p>Located in Nakuru, Njoro town.</p>
                <address className="public__addr">
                    Allan Mathenge <br />
                    20107 Njoro <br />
                    Nakuru <br />
                    <a href="tel: +254784131234">Call Us 0784131234</a>
                </address>
                <br />
                <p>Owner: Allan Mathenge</p>
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>
    )
    return content
}

export default Public