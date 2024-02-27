import { z } from "zod";

export function createDefaultGateway(): Gateway {
  return {
    color: "black",
    size: "small",
    waves: [],
    failures: [],
    rewards: [],
    rules: defaultGateRules,
    spawn_algorithm: "gateways:open_field",
    boss_event: {
      fog: true,
      mode: "boss_bar",
    },
  };
} 

export function createDefaultEndlessGateway(): EndlessGateway {
  return {
    color: "black",
    size: "small",
    base_wave: {
      entities: [],
      max_wave_time: 20,
      modifiers: [],
      rewards: [],
      setup_time: 20,
    },
    modifiers: [],
    failures: [],
    rules: defaultGateRules,
    spawn_algorithm: "gateways:open_field",
    boss_event: {
      fog: true,
      mode: "boss_bar",
    },
  };
}

export type Gateway = z.infer<typeof gatewaySchema>;
export type EndlessGateway = z.infer<typeof endlessGatewaySchema>;
export type GateRules = z.infer<typeof gateRulesSchema>;

const defaultGateRules: GateRules = {
  spawn_range: 8,
  leash_range: 32,
  allow_discarding: false,
  allow_dim_change: false,
  player_damage_only: false,
  remove_mobs_on_failurs: true,
  fail_on_out_of_bounds: false,
  spacing: 0,
};

const applicationModeSchema = z.object({
  type: z.literal("gateways:after_wave"),
});

const bossEventSettingsSchema = z.object({
  mode: z.union([z.literal("boss_bar"), z.literal("name_plate")]),
  fog: z.boolean(),
});

const gateRulesSchema = z.object({
  spawn_range: z.number(),
  leash_range: z.number(),
  allow_discarding: z.boolean(),
  allow_dim_change: z.boolean(),
  player_damage_only: z.boolean(),
  remove_mobs_on_failurs: z.boolean(),
  fail_on_out_of_bounds: z.boolean(),
  spacing: z.number(),
});

const spawnAlgorithmSchema = z.union([
  z.literal("gateways:open_field"),
  z.literal("gateways:inward_spiral"),
]);

const waveModifierSchema = z.union([
  z.object({
    type: z.literal("gateways:mob_effect"),
  }),
  z.object({
    type: z.literal("gateways:attribute"),
  }),
  z.object({
    type: z.literal("gateways:gear_set"),
  }),
]);

const itemStackSchema = z.object({
  item: z.string(),
  optional: z.boolean(),
  count: z.number(),
  nbt: z.string(),
  cap_nbt: z.string(),
});

const failureSchema = z.union([
  z.object({
    type: z.literal("gateways:explosion"),
  }),
  z.object({
    type: z.literal("gateways:mob_effect"),
  }),
  z.object({
    type: z.literal("gateways:command"),
  }),
  z.object({
    type: z.literal("gateways:chanced"),
  }),
  z.object({
    type: z.literal("gateways:summon"),
  }),
]);

const waveEntitySchema = z.object({
  type: z.literal("gateways:standard"),
  entity: z.string(),
  desc: z.string(),
  nbt: z.string(),
  modifiers: z.array(waveModifierSchema),
  count: z.number(),
});

const rewardSchema = z.union([
  z.object({
    type: z.literal("gateways:stack"),
    stack: itemStackSchema,
  }),
  z.object({
    type: z.literal("gateways:stack_list"),
    stacks: z.array(itemStackSchema),
  }),
  z.object({
    type: z.literal("gateways:entity_loot"),
    entity: z.string(),
    nbt: z.string(),
    rolls: z.number(),
  }),
]);

const endlessModifierSchema = z.object({
  application_mode: applicationModeSchema,
  entities: z.array(waveEntitySchema),
  rewards: z.array(rewardSchema),
  modifiers: z.array(waveModifierSchema),
  max_wave_time: z.number(),
  setup_time: z.number(),
});

const waveSchema = z.object({
  entities: z.array(waveEntitySchema),
  modifiers: z.array(waveModifierSchema),
  rewards: z.array(rewardSchema),
  max_wave_time: z.number(),
  setup_time: z.number(),
});

export const endlessGatewaySchema = z.object({
  size: z.union([z.literal("small"), z.literal("medium"), z.literal("large")]),
  color: z.string(),
  base_wave: waveSchema,
  modifiers: z.array(endlessModifierSchema),
  failures: z.array(failureSchema),
  spawn_algorithm: spawnAlgorithmSchema,
  rules: gateRulesSchema,
  boss_event: bossEventSettingsSchema,
});

export const gatewaySchema = z.object({
  size: z.union([z.literal("small"), z.literal("medium"), z.literal("large")]),
  color: z.string(),
  waves: z.array(waveSchema),
  rewards: z.array(rewardSchema),
  failures: z.array(failureSchema),
  spawn_algorithm: spawnAlgorithmSchema,
  rules: gateRulesSchema,
  boss_event: bossEventSettingsSchema,
});
