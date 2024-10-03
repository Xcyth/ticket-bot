import { ActionRowBuilder, ApplicationCommandOptionType, ButtonBuilder, ButtonStyle, CommandInteraction, EmbedBuilder, TextChannel } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";

@Discord()
export class Setup {
    @Slash({
        name: "setup",
        description: "Setup the ticket creation message",
    })
    async setup(
        @SlashOption({
            description: "The channel to setup",
            name: "channel",
            required: true,
            type: ApplicationCommandOptionType.Channel,
        }) channel: TextChannel,
        interaction: CommandInteraction
    ): Promise<void> {
        const embed = new EmbedBuilder()
            .setTitle("Ticket System")
            .setDescription("React to this message to create a ticket")
            .setColor("Blue");
        
        const button = new ButtonBuilder()
            .setLabel("Create Ticket")
            .setCustomId("create-ticket")
            .setStyle(ButtonStyle.Success);
        
        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

        const message = await channel.send({
            embeds: [embed],
            components: [row],
        });

        await interaction.reply({
            content: "Ticket creation message setup",
            ephemeral: true,
        });
    }
}