import { ButtonInteraction, CommandInteraction } from "discord.js";
import type { ArgsOf, Client } from "discordx";
import { ButtonComponent, Discord, On } from "discordx";
import { NewTicket } from "../commands/new.js";

@Discord()
export class Buttons {

  @ButtonComponent({ id: "create-ticket" })
  async createTicketButton(interaction: ButtonInteraction): Promise<void> {
    await NewTicket.prototype.newTicket("button", interaction as unknown as CommandInteraction);
  }
}
