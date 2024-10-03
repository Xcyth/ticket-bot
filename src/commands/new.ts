import { ApplicationCommandOptionType, CommandInteraction, PermissionFlagsBits } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import * as config from "../config.js"
import { prisma } from "../main.js";

@Discord()
export class NewTicket {
    @Slash({
        name: "new",
        description: "Create a new ticket",
    })
    async newTicket(
        @SlashOption({
            description: "Reason for the ticket",
            name: "reason",
            required: true,
            type: ApplicationCommandOptionType.String,
        }) reason: string,
        interaction: CommandInteraction
    ): Promise<void> {
        await interaction.deferReply({ ephemeral: true });
        
        // Create a new ticket
        const channel = await interaction.guild?.channels.create({
            name: `ticket-${interaction.user.id}`,
            parent: config.ticketCategoryId,
            permissionOverwrites: [
                {
                    id: interaction.guild?.id,
                    deny: [PermissionFlagsBits.ViewChannel],
                },
                {
                    id: interaction.user.id,
                    allow: [PermissionFlagsBits.ViewChannel],
                },
            ],
            reason,
        });

        await prisma.ticket.create({
            data: {
                reason,
                userId: interaction.user.id,
                username: interaction.user.username,
                channelId: channel?.id!,
                guildId: interaction.guildId!,
            },
        });


        await interaction.followUp({
            content: `Ticket created: <#${channel?.id}>`,
            ephemeral: true,
        });
    }
}