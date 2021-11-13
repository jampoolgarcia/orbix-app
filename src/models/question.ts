export interface QuestionI {
  id?: number;
  pk_materia: number;
  pregunta: string;
  descriccion: string;
  fecha_registro: Date;
  respuestas: String[] | String;
  correcta: number;
}