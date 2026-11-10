import FlipEffect from './FlipEffect';
import LiquidSlide from './LiquidSlide';
import DepthPush from './DepthPush';
import MaskReveal from './MaskReveal';
import ParticleDissolve from './ParticleDissolve';

export type EffectKey = 'flip' | 'liquid' | 'depth' | 'mask' | 'particle';

export type EffectProps = {
  activeKey: string;
  direction: number;
  children: React.ReactNode;
};

const effects: Record<EffectKey, React.ComponentType<EffectProps>> = {
  flip: FlipEffect,
  liquid: LiquidSlide,
  depth: DepthPush,
  mask: MaskReveal,
  particle: ParticleDissolve,
};

export default effects;
