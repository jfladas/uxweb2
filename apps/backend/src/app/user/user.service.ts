import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async findOrCreate(profile: any): Promise<User> {
    console.log("User profile received:", JSON.stringify(profile, null, 2)); // Debugging

    const githubProfile = profile as any; // Umgeht das `_json`-Problem

    // Sichere Auswahl des Namens
    const name = githubProfile.displayName || githubProfile.username || githubProfile.login || "Unknown User";

    // Prüfen, ob User bereits existiert
    let user = await this.userRepository.findOne({ where: { githubId: githubProfile.id } });

    if (!user) {
      user = this.userRepository.create({
        githubId: githubProfile.id, // GitHub-ID wird jetzt korrekt gespeichert
        username: githubProfile.username || githubProfile.login, // Falls `username` fehlt, nutze `login`
        name: name, // Garantiert, dass immer ein Name existiert
      });

      await this.userRepository.save(user);
    }

    return user;
  }
}