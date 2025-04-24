import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Purchase } from "./Purchase";

@Entity("game", { schema: "sase" })
export class Game {
  @PrimaryGeneratedColumn({ type: "int", name: "game_id", unsigned: true })
  gameId: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("boolean", { name: "active", default: () => "'true'" })
  active: boolean;

  @Column("varchar", { name: "website", length: 255 })
  website: string;

  @OneToMany(() => Purchase, (purchase) => purchase.game)
  purchases: Purchase[];
}
