import { cva } from 'class-variance-authority'
import React from 'react'
import { cn } from '@/lib/utils'

interface CustomClass {
  component?: string
  icon?: string
}

interface Props {
  icon: React.FC<React.SVGProps<SVGSVGElement> & { theme?: string }>
  text?: string
  className?: CustomClass
  theme?: string
}

const badgeVariants = cva(
  'z-10 flex items-center gap-2 rounded-full border shrink-0 border-slate-300 bg-slate-100 dark:border-slate-700 dark:bg-slate-950',
  {
    variants: {
      variant: {
        default: 'py-2 pl-3 pr-4',
        iconOnly: 'p-2'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

const BentoBadge = ({ icon: Icon, text, className, theme }: Props) => {
  const variant = text ? 'default' : 'iconOnly'
  
  return (
    <div
      className={cn(
        badgeVariants({ variant, className: className?.component })
      )}
    >
      <Icon className={cn('size-4', className?.icon)} theme={theme} />
      {!!text && <h3 className='text-sm text-zinc-700 dark:text-zinc-200'>{text}</h3>}
    </div>
  )
}

export default BentoBadge