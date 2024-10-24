import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
    return (
        <>
            <footer style={{ borderTop: "solid 4px"}}>
            <Container >
                <Row>
                    <Col sm={6}>
                    <b>Me retrouver</b>
                    <br/>
                    <p>
                    
Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque sed enim dicta commodi ipsum voluptatibus obcaecati, eius eum illum dolor odio, delectus, repellat maiores expedita quod quae dolore. Omnis, cupiditate.
                    </p>

                    </Col>

                    <Col sm={2}>
                    </Col>

                    <Col sm={4}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque sed enim dicta commodi ipsum voluptatibus obcaecati, eius eum illum dolor odio, delectus, repellat maiores expedita quod quae dolore. Omnis, cupiditate.</Col>
                </Row>
            </Container>
            </footer>
        </>
    )
}

export default Footer;