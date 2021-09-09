export interface AlertMessage {
  status: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  text: string;
}