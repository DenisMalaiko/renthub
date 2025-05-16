import { useQuery } from "@vue/apollo-composable";
import {ASK_LANG_CHAIN} from "~/graphql/queries";

export const askLangChain = async (prompt: string) => {
  return useQuery(ASK_LANG_CHAIN, {
    prompt
  })
}