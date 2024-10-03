import { ApplicationCommandOptionType, CommandInteraction, EmbedBuilder, TextChannel } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { logChannelId } from "../config.js";
import { createTranscript } from "@devjacob/discord-html-transcripts";

@Discord()
export class CloseCommand {
    @Slash({
        name: "close",
        description: "Close the ticket",
    })
    async close(
        @SlashOption({
            description: "Reason for closing the ticket",
            name: "reason",
            required: false,
            type: ApplicationCommandOptionType.String,
        }) reason: string,
        interaction: CommandInteraction
    ): Promise<void> {
        const channel: TextChannel = interaction.channel as TextChannel;

        if (!channel.name.startsWith("ticket-")) {
            await interaction.reply({
                content: "This command can only be used in a ticket channel",
                ephemeral: true,
            });
            return;
        }

        const logChannel: TextChannel = interaction.guild?.channels.cache.get(logChannelId) as TextChannel;

        const embed = new EmbedBuilder()
            .setTitle("Ticket Closed")
            .addFields([
                {
                    name: "Closed by",
                    value: interaction.user.tag,
                },
                {
                    name: "Reason",
                    value: reason || "No reason provided",
                },
            ])
            .setFooter({ text: `Ticket ID: ${channel.id}` })
            .setColor("DarkRed")
            .setTimestamp();
        
        const transcript = await createTranscript(channel)

        logChannel.send({
            embeds: [embed],
            files: [transcript]
        })

        await channel.delete();

        // await interaction.reply({
        //     content: "Ticket closed",
        //     ephemeral: true,
        // });
    }
}