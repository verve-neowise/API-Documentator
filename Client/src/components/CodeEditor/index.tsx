import React, { forwardRef, Ref, useEffect, useLayoutEffect } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';

type Props = {
  placeholder?: string
  value?: string
  disabled?: boolean
  className?: string
  ref?: Ref<HTMLInputElement>
  onChange: (value: string) => void
}

export default forwardRef(({ className, disabled, placeholder, value, onChange }: Props, ref: Ref<Editor>) => {
  const [code, setCode] = React.useState(value ?? '');

  return (
    <Editor
      value={code}
      disabled={disabled}
      ref={ref}
      placeholder={placeholder}
      onValueChange={code => {setCode(code); onChange(code) }}
      highlight={code => highlight(code, languages.javascript, 'javascript')}
      padding={10}
      className={`${className} h-48 p-2 border border-slate-100 rounded focus:border-blue-300 bg-none outline-none`} 
    />
  );
})