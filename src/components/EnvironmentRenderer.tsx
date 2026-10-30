import type { Environment } from '../types'
import { RainyCourtyard } from './RainyCourtyard'
import { GreenGarden } from './GreenGarden'
import { Dawn } from './Dawn'
import { MoonlitSanctuary } from './MoonlitSanctuary'

interface EnvironmentRendererProps {
  environment: Environment
  brightness: number
  motion: boolean
}

export function EnvironmentRenderer({ environment, brightness, motion }: EnvironmentRendererProps) {
  switch (environment) {
    case 'rainy-courtyard':
      return <RainyCourtyard brightness={brightness} motion={motion} />
    case 'green-garden':
      return <GreenGarden brightness={brightness} motion={motion} />
    case 'dawn':
      return <Dawn brightness={brightness} motion={motion} />
    case 'moonlit-sanctuary':
      return <MoonlitSanctuary brightness={brightness} motion={motion} />
    default:
      return <RainyCourtyard brightness={brightness} motion={motion} />
  }
}
