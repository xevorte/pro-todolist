import { Container, Navbar, NavbarBrand } from "reactstrap";

export default function Component() {
    return (
        <Navbar className="bg-main pt-8 pb-7">
            <Container className="max-w-5xl mx-auto px-7">
                <NavbarBrand href="/" className="text-2xl text-white font-bold">
                    TO DO LIST APP
                </NavbarBrand>
            </Container>
        </Navbar>
    )
}