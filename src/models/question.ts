export interface QuestionI {
  id?: number;
  pk_materia: number;
  pregunta: string;
  descripcion: string;
  fecha_registro: Date;
  fecha_actualizacion?: Date;
  respuesta?: string;
  respuestas: String[] | String;
  correcta: number;
}