import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import { Controller, useForm } from "react-hook-form";
import * as zod from "zod";
import { CloseButton, Content, Overlay, TransactionTypeButton, TransactionTypeContainer } from "./styles";

const newTransactionFormSchema = zod.object({
    description: zod.string(),
    price: zod.number(),
    category: zod.string(),
    type: zod.enum(['income', 'outcome'])
});

type newTransactionFormSchemaType = zod.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {
    const {
        control,
        register,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<newTransactionFormSchemaType>({
        resolver: zodResolver(newTransactionFormSchema)
    });

    function handleNewTransactionFormSubmit(input: newTransactionFormSchemaType) {
        console.log(input);
    }

    return (
        <Dialog.Portal>
            <Overlay />

            <Content>
                <Dialog.Title>Nova Transação</Dialog.Title>

                <CloseButton>
                    <X size={24} />
                </CloseButton>

                <form onSubmit={handleSubmit(handleNewTransactionFormSubmit)}>
                    <input
                        placeholder="Descrição"
                        id="description"
                        required
                        {...register("description")}
                        autoFocus
                    />
                    <input
                        placeholder="Preço"
                        id="price"
                        required
                        {...register("price", { valueAsNumber: true })}
                    />
                    <input
                        placeholder="Categoria"
                        id="category"
                        required
                        {...register("category")}
                    />

                    <Controller
                        control={control}
                        name="type"
                        render={(props) => {
                            return (
                                <TransactionTypeContainer
                                    onValueChange={props.field.onChange}
                                    value={props.field.value}
                                >
                                    <TransactionTypeButton value="income" variant="income">
                                        <ArrowCircleUp size={24} />
                                        <span>Entrada</span>
                                    </TransactionTypeButton>

                                    <TransactionTypeButton value="outcome" variant="outcome">
                                        <ArrowCircleDown size={24} />
                                        <span>Saída</span>
                                    </TransactionTypeButton>
                                </TransactionTypeContainer>
                            )
                        }}
                    />

                    <button
                        type="submit"
                        disabled={isSubmitting}
                    >
                        Cadastrar
                    </button>
                </form>

            </Content>
        </Dialog.Portal>
    );
}