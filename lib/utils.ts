import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCurrentTime(): string {
  const now = new Date();
  return now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getCurrentDateTime(): string {
  const now = new Date();
  return now.toLocaleString("id-ID", {
    dateStyle: "full",
    timeStyle: "medium",
  });
}

export const configureAssistant = () => {

  const vapiAssistant: CreateAssistantDTO = {
    name: "Presenter",
    firstMessage:
      "Halo",
    // ❌ Hilangkan transcriber
    voice: {
      provider: "11labs",
      model: "eleven_flash_v2_5",
      voiceId: "RWiGLY9uXI70QL540WNd",
      stability: 0.4,
      similarityBoost: 0.8,
      speed: 0.9,
      style: 0.5,
      useSpeakerBoost: true,
    },
    model: {
      provider: "openai",
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: ` 
         Halo selamat datang
        Informasi cuaca untuk wilayah {{ adm4 }} di kecamatan {{ adm3 }}

        Kondisi saat ini
        Suhu {{ temperaturUdaraSaatIni }}°C
        Kelembapan {{ kelembapanUdara }}%
        Jarak pandang {{ visibility }} km

        Prakiraan harian
        {{ jamDanKeadaan }}

        Demikian informasi cuaca hari ini terima kasih
          `,
        },
      ],
    },
    // ❌ Hilangkan clientMessages & serverMessages karena tidak perlu text
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    clientMessages: [],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    serverMessages: [],
  };
  return vapiAssistant;
};