import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react';
import classes from './Checkbox.module.css';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type CheckboxPropsType = DefaultInputPropsType & {
    onChangeChecked?: (checked: boolean) => void
    spanClassName?: string
}

export const Checkbox: React.FC<CheckboxPropsType> = (
    {
        type,
        onChange, onChangeChecked,
        className, spanClassName,
        children,
        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {

        onChange && onChange(e);

        onChangeChecked && onChangeChecked(e.currentTarget.checked);
    }

    const finalSpanClassName = `${classes.spanClassName} ${className ? className : ''}`;

    return (
        <label className={classes.label}>
            <input
                type={'checkbox'}
                onChange={onChangeCallback}
                className={classes.checkbox}
                {...restProps}
            />
            <span className={finalSpanClassName}>{children}</span>
        </label>
    )
}
