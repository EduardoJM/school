import React, { useState, useMemo } from 'react';
import katex from 'katex';

export interface MathExpressionModalProps {
    opened: boolean;
    handleClose: () => void;
    handleAddExpression: (expr: string, inline: boolean) => void;
}

const MathExpressionModal: React.FC<MathExpressionModalProps> = (props) => {
    const {
        opened,
        handleClose,
        handleAddExpression,
    } = props;
    const [expression, setExpression] = useState('');
    const [isInline, setIsInline] = useState(false);
    const [validTex, rendered] = useMemo(() => {
        try {
            const expr = katex.renderToString(expression, {
                displayMode: !isInline,
            });
            return [true, expr];
        } catch {
            return [false, 'TeX Inválido!'];
        }
    }, [expression, isInline]);

    function handleClickAdd() {
        handleAddExpression(expression, isInline);
    }

    if (!opened) {
        return null;
    }
    return (
        <div className={`modal math-expression-modal${opened ? ' opened' : ' closed'}`}>
            <div className="overlay">
                <div className="content">
                    <div className="content-top">
                        <label className="label-math-expression" htmlFor="math-expression">
                            Expressão:
                            <div className="tex-split">
                                <textarea
                                    id="math-expression"
                                    value={expression}
                                    onChange={(e) => setExpression(e.target.value)}
                                />
                                {// eslint-disable-next-line react/no-danger
                                    (<div className="tex-preview" dangerouslySetInnerHTML={{ __html: rendered }} />)
                                }
                            </div>
                        </label>
                        <label className="label-math-inline" htmlFor="math-inline">
                            <input
                                type="checkbox"
                                id="math-inline"
                                checked={isInline}
                                onChange={(e) => setIsInline(e.target.checked)}
                            />
                            Linear
                        </label>
                    </div>
                    <div className="content-footer">
                        <button
                            type="button"
                            className="btn btn-muted"
                            onClick={handleClose}
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleClickAdd}
                            disabled={!validTex}
                        >
                            Adicionar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MathExpressionModal;
