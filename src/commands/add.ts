import { ApplicationCommandOptionType, CommandInteraction, GuildMember, TextChannel } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";

@Discord()
export class AddCommand {
    @Slash({
        name: "add",
        description: "Add a member to a ticket",
    })
    async add(
        @SlashOption({
            description: "Member to add",
            name: "member",
            required: true,
            type: ApplicationCommandOptionType.User,
        }) member: GuildMember,
        interaction: CommandInteraction
    ): Promise<void> {
        await interaction.deferReply({ ephemeral: true });
        const channel: TextChannel = interaction.channel as TextChannel;

        if (!channel.name.startsWith("ticket-")) {
            await interaction.followUp({
                content: "This command can only be used in a ticket channel",
                ephemeral: true,
            });
            return;
        }

        await channel.permissionOverwrites.edit(member.id, {
            ViewChannel: true,
            SendMessages: true,
            ReadMessageHistory: true,
        });

        await interaction.followUp({
            content: `Added ${member.displayName} to the ticket`,
            ephemeral: true,
        });
    }
}