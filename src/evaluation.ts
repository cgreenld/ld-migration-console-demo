export interface Evaluation {
    value: boolean
}

export interface Evaluatable {
    evaluate: () => Evaluation | Promise<Evaluation>
}
