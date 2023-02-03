import { ChildrenProps } from "../../models/Props"

type Variant = 'primary' | 'red' | 'neutral' | 'success' | 'secondary'

type Props = { 
    variant?: Variant,
    icon?: JSX.Element,
    onClick?: () => void,
    loading?: boolean,
    disabled?: boolean,
    size?: 'sm' | 'md' | 'xs',
    className?: string,
} & ChildrenProps

type VariantColors = {
    [key: string]: {
        default: string,
        active: string,
        hover: string,
    }
}

const variantColors: VariantColors = {
    'primary': {
        default: 'bg-blue-50 text-blue-400',
        hover:   'hover:bg-blue-100',
        active:  'active:scale-95 active:bg-blue-200/50',
    },
    'red': {
        default: 'bg-red-50 text-red-400',
        hover:   'hover:bg-red-100',
        active:  'active:scale-95 active:bg-red-200/50',
    },
    'secondary': {
        default: 'bg-slate-100 text-slate-500',
        hover:   'hover:bg-slate-200',
        active:  'active:scale-95 active:bg-slate-300',
    },
    'neutral': {
        default: 'bg-slate-100 text-slate-500',
        hover:   'hover:bg-slate-200',
        active:  'active:scale-95 active:bg-slate-300',
    },
    'success': {
        default: 'bg-green-50 text-green-500',
        hover:   'hover:bg-green-100',
        active:  'active:scale-95 active:bg-green-200',
        },
}

export default ({ children, className = '', variant = 'primary', icon, onClick, disabled = false, loading = false, size = 'md' }: Props) => {

    const colors = variantColors[variant]

    let classes = disabled ? colors.default + ' opacity-50' : `${colors.default} ${colors.hover} ${colors.active}`

    let text = 'text-' + size

    return (
        <button onClick={onClick} disabled={disabled} className={className +  " flex gap-2 items-center px-5 py-1 rounded  transition-all duration-75 " + classes + ' ' + text}>
            { icon }
            { 
                loading ? <span className="opacity-50"> Loading </span> :
                children
            }
        </button>
    )
}