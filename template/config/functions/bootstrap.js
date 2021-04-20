"use strict";

const path = require("path");
const mime = require("mime-types");
const {
  siteVisitors
} = require("../../data/data.json");

async function isFirstRun() {
  const pluginStore = strapi.store({
    environment: strapi.config.environment,
    type: "type",
    name: "setup",
  });
  const initHasRun = await pluginStore.get({ key: "initHasRun" });
  await pluginStore.set({ key: "initHasRun", value: true });
  return !initHasRun;
};

async function setPublicPermissions(newPermissions) {
  // Find the ID of the public role
  const publicRole = await strapi
    .query("role", "users-permissions")
    .findOne({ type: "public" });

  // List all available permissions
  const publicPermissions = await strapi
    .query("permission", "users-permissions")
    .find({
      type: ["users-permissions", "application"],
      role: publicRole.id,
    });

  // Update permission to match new config
  const controllersToUpdate = Object.keys(newPermissions);
  const updatePromises = publicPermissions
    .filter((permission) => {
      // Only update permissions included in newConfig
      if (!controllersToUpdate.includes(permission.controller)) {
        return false;
      }
      if (!newPermissions[permission.controller].includes(permission.action)) {
        return false;
      }
      return true;
    })
    .map((permission) => {
      // Enable the selected permissions
      return strapi
        .query("permission", "users-permissions")
        .update({ id: permission.id }, { enabled: true })
    });
  await Promise.all(updatePromises);
}

// Create an entry and attach files if there are any
async function createEntry({ model, entry }) {
  try {
    const createdEntry = await strapi.query(model).create(entry);
  } catch (e) {
    console.log('model', entry, e);
  }
}

async function importSiteVisitors() {
  return Promise.all(siteVisitors.map((siteVisitor) => {
    return createEntry({ model: "site-visitor", entry: siteVisitor });
  }));
}

async function importSeedData() {
  // Allow read of application content types
  await setPublicPermissions({
    'site-visitor': ['find']

  });
  // Create all entries
   await importSiteVisitors();
}

module.exports = async () => {
  const shouldImportSeedData = await isFirstRun();

  if (shouldImportSeedData) {
    try {
      console.log('Setting up your starter...');
      await importSeedData();
      console.log('Ready to go');
    } catch (error) {
      console.log('Could not import seed data');
      console.error(error);
    }
  }
};
