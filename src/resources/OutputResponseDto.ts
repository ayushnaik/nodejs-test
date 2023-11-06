/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/** API output model */

class OutputResponseDto {
  success: boolean;
  status: number;
  message: string;
  data: object;
  errors: object;

  constructor(
    success?: boolean,
    status?: number,
    message?: string,
    data?: object,
    errors?: object,
  ) {
    this.success = success || false;
    this.status = status || 200;
    this.message = message || '';
    this.data = data || {};
    this.errors = errors || {};
  }
}

export default OutputResponseDto;