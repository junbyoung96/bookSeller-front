import React, { ForwardedRef, useRef } from "react";
import Button from "../components/common/Button";
import  InputText  from "../components/common/InputText";
import Title from "../components/common/Title";

function Home() {    
    return (
        <>        
        <Title size="large">
            test
        </Title>
        <Button size="large" scheme="primary" disabled={true}>            
            버튼
        </Button>
        <InputText placeholder="여기에 입력하세요"></InputText>
        
        <div>book</div>        
        </>
        
    )
}

export default Home;