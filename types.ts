
export type ArtisticStyle = 
  | 'Cinematic Photorealistic'
  | 'Anime'
  | 'Cinematic'
  | 'Surreal'
  | 'Watercolor'
  | 'Moebius'
  | 'Hyper-realistic';

export type AspectRatio = '16:9' | '9:16';

export interface GenerationParams {
  description: string;
  style: ArtisticStyle;
  aspectRatio: AspectRatio;
}

export interface VideoResult {
  url: string;
  params: GenerationParams;
  timestamp: number;
}
