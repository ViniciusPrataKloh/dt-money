import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";

export const Overlay = styled(Dialog.Overlay)`
    position: fixed;
    width: 100vw;
    height: 100vh;
    inset: 0;
    background: rgba(0, 0, 0, 0.75) ;
`;

export const CloseButton = styled(Dialog.Close)`
    position: absolute;
    background: transparent;
    border: 0;
    top: 1.5rem;
    right: 1.5rem;
    cursor: pointer;
    color: ${(props) => props.theme["gray-500"]};
    line-height: 0;
`;

export const Content = styled(Dialog.Content)`
    min-width: 32rem;
    border-radius: 6px;
    padding: 2.5rem 3rem;
    background: ${(props) => props.theme["gray-800"]};

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    
    form{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 2rem;

        input{
            padding: 1rem;
            border: 0;
            border-radius: 6px;
            background: ${(props) => props.theme["gray-900"]};
            color: ${(props) => props.theme["gray-300"]};

            &::placeholder {
                color: ${(props) => props.theme["gray-500"]};
            }
        }

        button[type="submit"]{
            height: 58px;
            margin-top: 1.5rem;
            padding: 0 1.5rem;
            border: 0;
            border-radius: 6px;
            background: ${(props) => props.theme["green-500"]};
            color: ${(props) => props.theme.white};
            font-weight: bold;
            cursor: pointer;

            &:hover{
                background: ${(props) => props.theme["green-700"]};
                transition: background-color 0.2s;
           }
        }
    }
`;