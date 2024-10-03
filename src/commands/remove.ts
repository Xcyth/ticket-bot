import { ApplicationCommandOptionType, CommandInteraction, GuildMember, TextChannel } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";

@Discord()
export class RemoveCommand {
    @Slash({
        name: "remove",
        description: "Remove a member from a ticket",
    })
    async remove(
        @SlashOption({
            description: "Member to remove",
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

        await channel.permissionOverwrites.delete(member.id);

        await interaction.followUp({
            content: `Removed ${member.displayName} from the ticket`,
            ephemeral: true,
        });
        
    }
}