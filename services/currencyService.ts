import { ExchangeRates } from '../types';

const PRIMARY_API = 'https://open.er-api.com/v6/latest/USD';
const FALLBACK_API = 'https://api.exchangerate-api.com/v4/latest/USD';

export const fetchRates = async (): Promise<ExchangeRates> => {
  try {
    // Try Primary API
    const response = await fetch(PRIMARY_API);
    if (!response.ok) {
      throw new Error(`Primary API error: ${response.status}`);
    }
    const data: ExchangeRates = await response.json();
    return data;
  } catch (primaryError) {
    console.warn("Primary API failed, attempting fallback...", primaryError);

    try {
      // Try Fallback API
      const response = await fetch(FALLBACK_API);
      if (!response.ok) {
        throw new Error(`Fallback API error: ${response.status}`);
      }
      const data = await response.json();

      // Normalize fallback data to match ExchangeRates interface
      return {
        result: 'success',
        provider: 'fallback',
        documentation: '',
        terms_of_use: '',
        time_last_update_unix: data.time_last_updated,
        time_last_update_utc: new Date(data.time_last_updated * 1000).toUTCString(),
        time_next_update_unix: data.time_last_updated + 86400,
        time_next_update_utc: '',
        base_code: data.base,
        rates: data.rates
      };
    } catch (fallbackError) {
      console.error("All currency data APIs failed:", fallbackError);
      throw fallbackError;
    }
  }
};