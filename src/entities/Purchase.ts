import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Game } from "./Game";
import { User } from "./User";

@Index("fk_purchase_game_idx", ["gameId"], {})
@Index("fk_purchase_user_idx", ["userId"], {})
@Entity("purchase", { schema: "sase" })
export class Purchase {
  @PrimaryGeneratedColumn({ type: "int", name: "purchase_id", unsigned: true })
  purchaseId: number;

  @Column("int", { name: "user_id", unsigned: true })
  userId: number;

  @Column("int", { name: "game_id", unsigned: true })
  gameId: number;

  @Column("boolean", { name: "paid" })
  paid: bool;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("datetime", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Game, (game) => game.purchases, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "game_id", referencedColumnName: "gameId" }])
  game: Game;

  @ManyToOne(() => User, (user) => user.purchases, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: User;
}
