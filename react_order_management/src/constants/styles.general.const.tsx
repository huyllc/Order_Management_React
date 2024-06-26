import styled from "styled-components";

export const InputErrorStyles = styled.p`
    font-size : 14px;
`;

export const LoadingOverlayStyles = styled.div`
    top: 0;
    left: 0;
    opacity: 0.95;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 0.5rem;
    z-index: 10;

    .loading-text{
        font-size: 18px;
        color: #ef672f;
        font-weight: 600;
    }
`;