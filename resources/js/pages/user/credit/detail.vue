<template>
  <div>
    <!-- <v-overlay
      :absolute="true"
      v-model="overlay"
      contained
      persistent
      class="align-center justify-center"
    >
      <v-col>
        <v-progress-circular color="primary" size="32" indeterminate>
        </v-progress-circular>
        <br />
        <span class="font-weight-bold text-lg">Loading....</span>
      </v-col>
    </v-overlay> -->
    <v-overlay :model-value="overlay" class="align-center justify-center">
      <v-progress-circular color="blue-lighten-3" indeterminate :size="41" :width="5"></v-progress-circular> Loading...
    </v-overlay>

    <v-card>
      <VCardTitle class="text-2xl font-weight-bold d-flex justify-left">
        Credit
      </VCardTitle>
      <v-card-text>
        <v-stepper :model-value="dataFile.phase - 1" :mobile="isMobile">
          <v-stepper-header>
            <v-stepper-item title="Phase 1" value="1" :complete="dataFile.phase > 2">
            </v-stepper-item>

            <v-divider></v-divider>

            <v-stepper-item title="Phase 2" value="2" :complete="dataFile.phase > 3"></v-stepper-item>

            <v-divider></v-divider>

            <v-stepper-item title="Phase 3" value="3" :complete="dataFile.phase > 4"></v-stepper-item>

            <v-divider v-if="isShowPhase4"></v-divider>

            <v-stepper-item title="Phase 4" value="4" :complete="dataFile.phase > 5" v-if="isShowPhase4"></v-stepper-item>
          </v-stepper-header>

          <v-stepper-window>
            <!-- step 1 -->
            <v-stepper-window-item value="1" v-if="userData && userData.position.role.isPhase1Access == 1">
              <v-card color="backgroundCard">
                <v-card-title class="text-2xl font-weight-bold d-flex justify-center">
                  Detail
                </v-card-title>
                <v-card-text>

                  <v-card class="mb-5">
                    <v-card-title>
                      <v-col class="d-flex justify-space-beetwen">
                        <span>Informasi Umum ℹ️</span>
                        <v-spacer></v-spacer>
                        <span>
                          <v-btn color="primary" size="small" class="my-3 mx-3" @click="openModal(4)">
                            Edit Data
                          </v-btn>
                        </span>
                      </v-col>
                    </v-card-title>
                    <v-card-text>
                      <v-list density="compact">
                        <v-list-item>
                          <template v-slot:prepend>
                            <v-icon icon="mdi-person"></v-icon>
                          </template>
                          <v-list-item-title> Nama Pemohon</v-list-item-title>
                          <v-list-item-title>
                            <strong>
                              {{ dataFile.name }}
                            </strong></v-list-item-title>
                        </v-list-item>
                        <v-list density="compact">
                          <v-list-item>
                            <template v-slot:prepend>
                              <v-icon icon="mdi-cash"></v-icon>
                            </template>
                            <v-list-item-title> Jumlah Plafon</v-list-item-title>
                            <v-list-item-title>
                              <strong>
                                Rp {{ formatInput(dataFile.plafon) }}
                              </strong></v-list-item-title>
                          </v-list-item>
                        </v-list>
                        <v-list density="compact">
                          <v-list-item>
                            <template v-slot:prepend>
                              <v-icon icon="mdi-office-building"></v-icon>
                            </template>
                            <v-list-item-title> Jenis Usaha</v-list-item-title>
                            <v-list-item-title>
                              <strong>
                                {{ dataFile.type_bussiness }}
                              </strong></v-list-item-title>
                          </v-list-item>
                        </v-list>
                        <v-list density="compact">
                          <v-list-item>
                            <template v-slot:prepend>
                              <v-icon icon="mdi-office-building"></v-icon>
                            </template>
                            <v-list-item-title> Deskripsi Usaha</v-list-item-title>
                            <v-list-item-title>
                              <strong>
                                {{ dataFile.desc_bussiness }}
                              </strong></v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-list>
                    </v-card-text>
                  </v-card>

                  <v-card>
                    <v-card-title>
                      <v-col class="d-flex justify-space-beetwen">
                        <span>Dokumen Pendukung 📄</span>
                        <v-spacer></v-spacer>
                        <span>
                          <v-btn color="primary" size="small" class="my-3 mx-3" @click="openModal(1)">
                            Tambah Data lain
                          </v-btn>
                        </span>
                      </v-col>
                    </v-card-title>
                    <v-card-text>
                      <div v-for="(attachment, index) in dataFile.attachments" :key="index">
                        <v-list density="compact" v-if="attachment.path != null">
                          <v-list-item>
                            <template v-slot:prepend>
                              <v-icon icon="mdi-file"></v-icon>
                            </template>
                            <v-list-item-title>
                              {{ attachment.name }}</v-list-item-title>
                            <template v-slot:append>
                              <div class="operation-wrapper">
                                <div class="d-flex justify-space-between">
                                  <v-tooltip location="top" text="Lihat File">
                                    <template v-slot:activator="{ props }">
                                      <a v-bind="props" :href="filePath +
                                        '/' +
                                        dataFile.id +
                                        '/' +
                                        attachment.path
                                        " target="_blank" rel="noopener noreferrer">
                                        <button>
                                          <VIcon size="20" icon="bx-link-external" color="blue" />
                                        </button>
                                      </a>
                                    </template>
                                  </v-tooltip>

                                  <v-tooltip location="top" text="Edit File" v-if="userData.id == dataFile.user_id">
                                    <template v-slot:activator="{ props }">
                                      <button v-bind="props" @click="openModal(2, attachment)">
                                        <VIcon size="20" icon="bx-edit" color="blue" />
                                      </button>
                                    </template>
                                  </v-tooltip>

                                  <v-tooltip location="top" text="Hapus File" v-if="userData.id == dataFile.user_id">
                                    <template v-slot:activator="{ props }">
                                      <button v-bind="props" @click="deleteAttachment(attachment.id)">
                                        <VIcon size="20" icon="bx-trash" color="red" />
                                      </button>
                                    </template>
                                  </v-tooltip>
                                </div>
                              </div>
                            </template>
                          </v-list-item>
                        </v-list>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-card-text>

                <!-- Approval -->
                <v-card-text>
                  <v-card>
                    <v-card-title>
                      Status Verifikasi ✅
                    </v-card-title>
                    <v-card-text>
                      <div v-if="
                        dataFile &&
                        dataFile.approvals &&
                        dataFile.approvals.length
                      ">
                        <template v-for="(app, index) in dataFile.approvals" :key="index">
                          <v-chip v-if="dataFile.phase == app.phase" :color="app.approved == 1 ? 'success' : 'error'"
                            class="mr-2" @click="changeApproval(app.id)">
                            {{ app.user.name }}
                          </v-chip>
                        </template>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-card-text>
                <!-- note per phase -->
                <!-- <v-divider></v-divider>
                <v-card-text>
                  <v-expansion-panels>
                    <v-expansion-panel>
                      <v-expansion-panel-title>
                        <span
                          class="text-xl font-weight-bold d-flex justify-center"
                        >
                          Record Note
                        </span>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text>
                        <div
                          v-if="
                            dataFile && dataFile.notes && dataFile.notes.length
                          "
                        >
                          <template
                            v-for="(note, index) in dataFile.notes"
                            :key="index"
                          >
                            <v-card v-if="note.phase == 1">
                              <v-card-title>Phase 1</v-card-title>
                              <v-card-text> {{ note.note }}</v-card-text>
                            </v-card>
                            <v-card v-if="note.phase == 2">
                              <v-card-title>Phase 2</v-card-title>
                              <v-card-text> {{ note.note }}</v-card-text>
                            </v-card>
                          </template>
                        </div>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-card-text> -->

                <!-- tambah note -->
                <v-divider></v-divider>
                <v-card-text>
                  <v-card>
                    <v-card-title>
                      <span class="text-xl font-weight-bold d-flex justify-center my-2">
                        Note
                      </span>
                      <VForm @submit.prevent="insertNote">
                        <v-row align="center" justify="center">
                          <VCol md="10" cols="10">
                            <v-textarea rows="2" bg-color="grey-lighten-2" color="cyan"
                              v-model="dataNote.note"></v-textarea>
                          </VCol>
                          <VCol md="2" cols="2">
                            <v-btn density="compact" icon="mdi-note-plus" type="submit"></v-btn>
                          </VCol>
                        </v-row>
                      </VForm>
                    </v-card-title>
                    <v-card-text>
                      <div>
                        <div v-for="(comment, index) in dataFile.notes" :key="index" class="user-comment">
                          <div class="comment-content">
                            <p>{{ comment.note }}</p>
                            <v-row class="justify-space-between mx-2 mb-2">
                              <small>{{ comment.user.name }} -
                                {{ comment.user.position.name }}</small>
                              <small>{{
                                formatDate(comment.created_at)
                              }}</small>
                            </v-row>
                          </div>

                          <v-menu transition="scale-transition" v-if="userData.id == comment.user_id">
                            <template v-slot:activator="{ props }">
                              <v-icon v-bind="props" class="ellipsis-icon">mdi-dots-vertical</v-icon>
                            </template>

                            <v-list>
                              <v-list-item color="primary" @click="openModal(3, comment)">
                                <template v-slot:prepend>
                                  <v-icon icon="mdi-edit"></v-icon>
                                </template>

                                <v-list-item-title> edit</v-list-item-title>
                              </v-list-item>
                              <v-list-item color="primary" @click="deleteNote(comment.id)">
                                <template v-slot:prepend>
                                  <v-icon icon="mdi-trash"></v-icon>
                                </template>

                                <v-list-item-title> hapus</v-list-item-title>
                              </v-list-item>
                            </v-list>
                          </v-menu>
                        </div>
                      </div>
                      <div></div>
                    </v-card-text>
                  </v-card>
                </v-card-text>

                <!-- prev/next btn -->
                <v-card-actions>
                  <v-col class="d-flex justify-space-beetwen">
                    <v-spacer></v-spacer>
                    <v-btn color="info" text="Next" variant="tonal" @click="step(fileId, 'next')"></v-btn>
                  </v-col>
                </v-card-actions>
              </v-card>
            </v-stepper-window-item>
            <v-stepper-window-item value="1" v-else>
              <div style="
                  color: red;
                  font-size: 20px;
                  text-align: center;
                  padding: 10px;
                ">
                Anda Dilarang melihat Phase ini
              </div>
            </v-stepper-window-item>

            <v-stepper-window-item value="2" v-if="userData && userData.position.role.isPhase2Access == 1">
              <v-card color="backgroundCard">
                <v-card-title class="text-2xl font-weight-bold d-flex justify-center">
                  Detail
                </v-card-title>
                <v-card-text>

                  <v-card class="mb-5">
                    <v-card-title>
                      <v-col class="d-flex justify-space-beetwen">
                        <span>Informasi Umum ℹ️</span>
                        <v-spacer></v-spacer>
                        <span>
                          <v-btn color="primary" size="small" class="my-3 mx-3" @click="openModal(4)">
                            Edit Data
                          </v-btn>
                        </span>
                      </v-col>
                    </v-card-title>
                    <v-card-text>
                      <v-list density="compact">
                        <v-list-item>
                          <template v-slot:prepend>
                            <v-icon icon="mdi-person"></v-icon>
                          </template>
                          <v-list-item-title> Nama Pemohon</v-list-item-title>
                          <v-list-item-title>
                            <strong>
                              {{ dataFile.name }}
                            </strong></v-list-item-title>
                        </v-list-item>
                        <v-list density="compact">
                          <v-list-item>
                            <template v-slot:prepend>
                              <v-icon icon="mdi-cash"></v-icon>
                            </template>
                            <v-list-item-title> Jumlah Plafon</v-list-item-title>
                            <v-list-item-title>
                              <strong>
                                Rp {{ formatInput(dataFile.plafon) }}
                              </strong></v-list-item-title>
                          </v-list-item>
                        </v-list>
                        <v-list density="compact">
                          <v-list-item>
                            <template v-slot:prepend>
                              <v-icon icon="mdi-office-building"></v-icon>
                            </template>
                            <v-list-item-title> Jenis Usaha</v-list-item-title>
                            <v-list-item-title>
                              <strong>
                                {{ dataFile.type_bussiness }}
                              </strong></v-list-item-title>
                          </v-list-item>
                        </v-list>
                        <v-list density="compact">
                          <v-list-item>
                            <template v-slot:prepend>
                              <v-icon icon="mdi-office-building"></v-icon>
                            </template>
                            <v-list-item-title> Deskripsi Usaha</v-list-item-title>
                            <v-list-item-title>
                              <strong>
                                {{ dataFile.desc_bussiness }}
                              </strong></v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-list>
                    </v-card-text>
                  </v-card>

                  <v-card>
                    <v-card-title>
                      <v-col class="d-flex justify-space-beetwen">
                        <span>Dokumen Pendukung 📄</span>
                        <v-spacer></v-spacer>
                        <span>
                          <v-btn color="primary" size="small" class="my-3 mx-3" @click="openModal(1)">
                            Tambah Data lain
                          </v-btn>
                        </span>
                      </v-col>
                    </v-card-title>
                    <v-card-text>
                      <div v-for="(attachment, index) in dataFile.attachments" :key="index">
                        <v-list density="compact" v-if="attachment.path != null">
                          <v-list-item>
                            <template v-slot:prepend>
                              <v-icon icon="mdi-file"></v-icon>
                            </template>
                            <v-list-item-title>
                              {{ attachment.name }}</v-list-item-title>
                            <template v-slot:append>
                              <div class="operation-wrapper">
                                <div class="d-flex justify-space-between">
                                  <v-tooltip location="top" text="Lihat File">
                                    <template v-slot:activator="{ props }">
                                      <a v-bind="props" :href="filePath +
                                        '/' +
                                        dataFile.id +
                                        '/' +
                                        attachment.path
                                        " target="_blank" rel="noopener noreferrer">
                                        <button>
                                          <VIcon size="20" icon="bx-link-external" color="blue" />
                                        </button>
                                      </a>
                                    </template>
                                  </v-tooltip>

                                  <v-tooltip location="top" text="Edit File" v-if="userData.id == dataFile.user_id">
                                    <template v-slot:activator="{ props }">
                                      <button v-bind="props" @click="openModal(2, attachment)">
                                        <VIcon size="20" icon="bx-edit" color="blue" />
                                      </button>
                                    </template>
                                  </v-tooltip>

                                  <v-tooltip location="top" text="Hapus File" v-if="userData.id == dataFile.user_id">
                                    <template v-slot:activator="{ props }">
                                      <button v-bind="props" @click="deleteAttachment(attachment.id)">
                                        <VIcon size="20" icon="bx-trash" color="red" />
                                      </button>
                                    </template>
                                  </v-tooltip>
                                </div>
                              </div>
                            </template>
                          </v-list-item>
                        </v-list>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-card-text>

                <!-- Approval -->
                <v-card-text>
                  <v-card>
                    <v-card-title>
                      Status Verifikasi ✅
                    </v-card-title>
                    <v-card-text>
                      <div v-if="
                        dataFile &&
                        dataFile.approvals &&
                        dataFile.approvals.length
                      ">
                        <template v-for="(app, index) in dataFile.approvals" :key="index">
                          <v-chip v-if="dataFile.phase == app.phase" :color="app.approved == 1 ? 'success' : 'error'"
                            class="mr-2" @click="changeApproval(app.id)">
                            {{ app.user.name }}
                          </v-chip>
                        </template>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-card-text>
                <!-- note per phase -->
                <!-- <v-divider></v-divider>
                <v-card-text>
                  <v-expansion-panels>
                    <v-expansion-panel>
                      <v-expansion-panel-title>
                        <span
                          class="text-xl font-weight-bold d-flex justify-center"
                        >
                          Record Note
                        </span>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text>
                        <div
                          v-if="
                            dataFile && dataFile.notes && dataFile.notes.length
                          "
                        >
                          <template
                            v-for="(note, index) in dataFile.notes"
                            :key="index"
                          >
                            <v-card v-if="note.phase == 1">
                              <v-card-title>Phase 1</v-card-title>
                              <v-card-text> {{ note.note }}</v-card-text>
                            </v-card>
                            <v-card v-if="note.phase == 2">
                              <v-card-title>Phase 2</v-card-title>
                              <v-card-text> {{ note.note }}</v-card-text>
                            </v-card>
                          </template>
                        </div>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-card-text> -->

                <!-- tambah note -->
                <v-divider></v-divider>
                <v-card-text>
                  <v-card>
                    <v-card-title>
                      <span class="text-xl font-weight-bold d-flex justify-center my-2">
                        Note
                      </span>
                      <VForm @submit.prevent="insertNote">
                        <v-row align="center" justify="center">
                          <VCol md="10" cols="10">
                            <v-textarea rows="2" bg-color="grey-lighten-2" color="cyan"
                              v-model="dataNote.note"></v-textarea>
                          </VCol>
                          <VCol md="2" cols="2">
                            <v-btn density="compact" icon="mdi-note-plus" type="submit"></v-btn>
                          </VCol>
                        </v-row>
                      </VForm>
                    </v-card-title>
                    <v-card-text>
                      <div>
                        <div v-for="(comment, index) in dataFile.notes" :key="index" class="user-comment">
                          <div class="comment-content">
                            <p>{{ comment.note }}</p>
                            <v-row class="justify-space-between mx-2 mb-2">
                              <small>{{ comment.user.name }} -
                                {{ comment.user.position.name }}</small>
                              <small>{{
                                formatDate(comment.created_at)
                              }}</small>
                            </v-row>
                          </div>

                          <v-menu transition="scale-transition" v-if="userData.id == comment.user_id">
                            <template v-slot:activator="{ props }">
                              <v-icon v-bind="props" class="ellipsis-icon">mdi-dots-vertical</v-icon>
                            </template>

                            <v-list>
                              <v-list-item color="primary" @click="openModal(3, comment)">
                                <template v-slot:prepend>
                                  <v-icon icon="mdi-edit"></v-icon>
                                </template>

                                <v-list-item-title> edit</v-list-item-title>
                              </v-list-item>
                              <v-list-item color="primary" @click="deleteNote(comment.id)">
                                <template v-slot:prepend>
                                  <v-icon icon="mdi-trash"></v-icon>
                                </template>

                                <v-list-item-title> hapus</v-list-item-title>
                              </v-list-item>
                            </v-list>
                          </v-menu>
                        </div>
                      </div>
                      <div></div>
                    </v-card-text>
                  </v-card>
                </v-card-text>

                <!-- prev/next btn -->
                <v-card-actions>
                  <v-col class="d-flex justify-space-beetwen">
                    <v-btn color="info" text="Prev" variant="tonal" @click="step(fileId, '-')"></v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="info" text="Next" variant="tonal" @click="step(fileId, 'next')"></v-btn>
                  </v-col>
                </v-card-actions>
              </v-card>
            </v-stepper-window-item>
            <v-stepper-window-item value="2" v-else>
              <div style="
                  color: red;
                  font-size: 20px;
                  text-align: center;
                  padding: 10px;
                ">
                Anda Dilarang melihat Phase ini
              </div>
            </v-stepper-window-item>

            <!-- <v-stepper-window-item
            value="3"
            v-if="userData && userData.position.role.isPhase3Access == 1"
          >
            <v-card>
              <v-card-title> PHASE 3 </v-card-title>
              <v-card-text> Cras hendrerit suscipit porta. </v-card-text>
              <v-card-actions>
                <v-col class="d-flex justify-space-beetwen">
                  <v-btn
                    color="teal-accent-4"
                    text="Close"
                    variant="text"
                  ></v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="teal-accent-4"
                    text="Next"
                    variant="text"
                    @click="nextStep(2)"
                  ></v-btn>
                </v-col>
              </v-card-actions>
            </v-card>
          </v-stepper-window-item>
          <v-stepper-window-item value="3" v-else>
            <div
              style="
                color: red;
                font-size: 20px;
                text-align: center;
                padding: 10px;
              "
            >
              Anda Dilarang melihat Phase ini
            </div>
          </v-stepper-window-item>

          <v-stepper-window-item
            value="4"
            v-if="userData && userData.position.role.isPhase4Access == 1"
          >
            <v-card>
              <v-card-title> PHASE 4 </v-card-title>
              <v-card-text> Cras hendrerit suscipit porta. </v-card-text>
              <v-card-actions>
                <v-col class="d-flex justify-space-beetwen">
                  <v-btn
                    color="teal-accent-4"
                    text="Close"
                    variant="text"
                  ></v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="teal-accent-4"
                    text="Next"
                    variant="text"
                    @click="nextStep(4)"
                  ></v-btn>
                </v-col>
              </v-card-actions>
            </v-card>
          </v-stepper-window-item>
          <v-stepper-window-item value="4" v-else>
            <div
              style="
                color: red;
                font-size: 20px;
                text-align: center;
                padding: 10px;
              "
            >
              Anda Dilarang melihat Phase ini
            </div>
          </v-stepper-window-item> -->
          </v-stepper-window>
        </v-stepper>
      </v-card-text>
    </v-card>

    <v-dialog v-model="insertAttch" width="auto">
      <v-card>
        <template v-slot:title> Tambah Data </template>

        <template v-slot:text>
          <v-form @submit.prevent="insertAttachment">
            <v-row>
              <VCol md="12" cols="12">
                <span style="color: red">*</span><span class="subtitle-1 text-center">Keterangan File: </span>

                <VTextField class="my-3" v-model="attachFile.name" autofocus :rules="[rules.required]" />
              </VCol>
              <VCol md="12" cols="12">
                <span style="color: red">*</span>
                <span class="subtitle-1 text-center"> Upload File: </span>

                <v-file-input class="my-3" accept="image/jpeg,image/png" placeholder="Pick an image"
                  :rules="[rules.required]" @change="(event) => handleFileChange(event)"></v-file-input>
              </VCol>
              <VCol md="12" cols="12" v-if="dataFile.phase == 2">
                <v-select label="Apakah Termasuk File Rahasia ? (SLIK, dll)" :items="[
                  { value: 1, title: 'Ya' },
                  { value: 0, title: 'Tidak' },
                ]" v-model="attachFile.isSecret" prepend-icon="mdi-help-rhombus"></v-select>
              </VCol>
              <VCol cols="12" class="d-flex flex-wrap gap-4">
                <VBtn type="submit" :disabled="(attachFile.name && attachFile.path) == null">
                  Simpan
                </VBtn>
                <button type="button" class="btn btn-blue" @click="closeModal(1)">
                  Batal
                </button>
              </VCol>
            </v-row>
          </v-form>
        </template>

        <template v-slot:actions>
          <v-progress-linear v-model="uploadProgress" color="amber" height="25"></v-progress-linear>
        </template>
      </v-card>
    </v-dialog>

    <v-dialog v-model="updateAttch" width="auto">
      <v-card>
        <template v-slot:title> Edit Data </template>

        <template v-slot:text>
          <v-form @submit.prevent="editAttachment">
            <v-row>
              <VCol md="12" cols="12">
                <span style="color: red">*</span>
                <span class="subtitle-1 text-center">Keterangan File: </span>

                <VTextField class="my-3" v-model="attachFile.name" autofocus :rules="[rules.required]" />
              </VCol>
              <VCol md="12" cols="12">
                <span style="color: red">*</span>
                <span class="subtitle-1 text-center"> Upload File: </span>

                <v-file-input class="my-3" accept="image/jpeg,image/png" placeholder="Pick an image"
                  :rules="[rules.required]" @change="(event) => handleFileChange(event)"></v-file-input>
              </VCol>
              <VCol md="12" cols="12" v-if="dataFile.phase == 2">
                <v-select label="Apakah Termasuk File Rahasia ? (SLIK, dll)" :items="[
                  { value: 1, title: 'Ya' },
                  { value: 0, title: 'Tidak' },
                ]" v-model="attachFile.isSecret" prepend-icon="mdi-help-rhombus"></v-select>
              </VCol>
              <VCol cols="12" class="d-flex flex-wrap gap-4">
                <VBtn type="submit"> Update </VBtn>
                <button type="button" class="btn btn-blue" @click="closeModal(2)">
                  Batal
                </button>
              </VCol>
            </v-row>
          </v-form>
        </template>

        <template v-slot:actions>
          <v-progress-linear v-model="uploadProgress" color="amber" height="25"></v-progress-linear>
        </template>
      </v-card>
    </v-dialog>

    <v-dialog v-model="isUpdateGeneralInfo" width="auto">
      <v-card>
        <template v-slot:title> Edit Informasi Umum </template>

        <template v-slot:text>
          <v-form @submit.prevent="updateGeneralInfo">
            <v-row>
              <VCol md="12" cols="12">
                <span style="color: red">*</span
                ><span class="subtitle-1 text-center">Nama Pemohon: </span>

                <VTextField
                  class="my-3"
                  v-model="generalInfo.name"
                  autofocus
                  :rules="[rules.required]"
                />
              </VCol>
              <VCol md="12" cols="12">
                <span style="color: red">*</span
                ><span class="subtitle-1 text-center">Jumlah Plafon: </span>

                <VTextField
                  class="my-3"
                  v-model="generalInfo.plafon"
                  type="text"
                  @input="formatInputPlafon"
                />
              </VCol>
              <VCol md="12" cols="12">
                <span style="color: red">*</span
                ><span class="subtitle-1 text-center">Jenis Usaha: </span>

                <VTextField
                  class="my-3"
                  v-model="generalInfo.type_bussiness"
                  :rules="[rules.required]"
                />
              </VCol>
              <VCol md="12" cols="12">
                <span style="color: red">*</span
                ><span class="subtitle-1 text-center">Deskripsi Usaha: </span>

                <VTextField
                  class="my-3"
                  v-model="generalInfo.desc_bussiness"
                  :rules="[rules.required]"
                />
              </VCol>
              <VCol cols="12" class="d-flex flex-wrap gap-4">
                <VBtn type="submit"> Update </VBtn>
                <button type="button" class="btn btn-blue" @click="closeModal(4)">
                  Batal
                </button>
              </VCol>
            </v-row>
          </v-form>
        </template>

        <template v-slot:actions>
          <v-progress-linear v-model="uploadProgress" color="amber" height="25"></v-progress-linear>
        </template>
      </v-card>
    </v-dialog>

    <v-dialog v-model="isUpdateNote" width="auto">
      <v-card>
        <template v-slot:title> Update Note </template>
        <template v-slot:text>
          <VForm @submit.prevent="updateNote">
            <v-row align="center" justify="center">
              <VCol md="10" cols="10">
                <v-textarea bg-color="grey-lighten-2" color="cyan" v-model="updateDataNote.note" rows="2"></v-textarea>
              </VCol>
              <VCol md="2" cols="2">
                <v-btn density="compact" icon="mdi-note-plus" type="submit"></v-btn>
              </VCol>
            </v-row>
          </VForm>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import mainURL from "@/axios";

export default {
  data() {
    return {
      overlay: false,
      isMobile: false,
      userData: null,
      fileId: this.$route.params.fileId,
      isShowPhase4: false,

      isUpdateGeneralInfo: false,
      generalInfo: {
        id: null,
        name: "",
        type_bussiness: "",
        desc_bussiness: "",
        plafon: "0",
      },

      dataFile: {
        id: null,
        user_id: null,
        phase: 1,
        name: "",
        type_bussiness: "",
        desc_bussiness: "",
        plafon: "0",
        surveyResult: "-",
        surveyResult: "-",
        otsResult: "-",
        cekLingResult: "-",
        verTelResult: "-",
        creditScoring: "-",
        attachments: [],
        notes: [],
        approvals: [],
      },
      filePath: this.$filePath,

      //=>note
      isUpdateNote: false,
      dataNote: {
        file_id: this.$route.params.fileId,
        note: null,
        isRead: null,
      },
      updateDataNote: {
        file_id: this.$route.params.fileId,
        note: null,
        isRead: null,
      },

      //=>attachment
      insertAttch: false,
      updateAttch: false,
      rules: {
        required: (value) => !!value || "Required",
      },
      uploadProgress: null,
      attachFile: {
        id: null,
        file_id: this.$route.params.fileId,
        name: null,
        path: null,
        note: null,
        isSecret: false,
      },
    };
  },
  methods: {
    formatInputPlafon(event: { target: { value: any } }) {
      let value = event.target.value;
      value = value.replace(/\D/g, ""); // Remove non-digit characters
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add comma as thousand separator
      event.target.value = value;
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID");
    },
    resetNote() {
      this.dataNote = {
        file_id: null,
        user_id: null,
        phase: null,
        note: null,
        isRead: null,
      };
    },
    checkMobile() {
      this.isMobile = window.innerWidth < 728 ? true : false;
    },
    formatInput(value: string) {
      // Lakukan pemformatan nilai plafon di sini
      value = value.replace(/\D/g, ""); // Remove non-digit characters
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add comma as thousand separator
      return value;
    },
    async step(id: any, type: any) {
      try {
        if (type == "next") {
          const confirmNext = window.confirm(
            `Apakah Anda yakin melanjutkan ke phase selanjutnya`
          );
          if (!confirmNext) return;
          // this.overlay = true;
          const formData = new FormData();
          formData.append("id", id);
          formData.append("type", type);
          formData.append("_method", "POST");

          const response = await mainURL.post(
            "/user/change-phase-approve",
            formData
          );
          if (response.status === 200) {
            this.overlay = false;
            this.getDetailFile(this.fileId);
            this.$showToast("success", "Success", response.data.message);
          } else {
            this.overlay = false;
            this.getDetailFile(this.fileId);
            this.$showToast("error", "Sorry", response.data.data.message);
          }
        } else {
          const confirmNext = window.confirm(
            `Apakah Anda yakin Kembali ke phase sebelumnya`
          );
          if (!confirmNext) return;
          this.overlay = true;
          const formData = new FormData();
          formData.append("id", id);
          formData.append("type", type);
          formData.append("_method", "POST");
          const response = await mainURL.post(
            "/user/change-phase-approve",
            formData
          );
          if (response.status === 200) {
            this.overlay = false;
            this.getDetailFile(this.fileId);
            this.$showToast("success", "Success", response.data.message);
          } else {
            this.overlay = false;
            this.getDetailFile(this.fileId);
            this.$showToast("error", "Sorry", response.data.message);
          }
        }
      } catch (error) {
        this.overlay = false;
        this.getDetailFile(this.fileId);
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
    async getDetailFile(id: any) {
      try {
        this.overlay = true;
        const response = await mainURL.get(`/user/credit/${id}`);

        if (response.status === 200) {
          this.dataFile = response.data.data.file;
          this.isShowPhase4 = parseInt(this.dataFile.plafon) < 25000000 ? false : true;
          this.generalInfo.id = this.dataFile.id;         
          this.generalInfo.name = this.dataFile.name;         
          this.generalInfo.type_bussiness = this.dataFile.type_bussiness;         
          this.generalInfo.desc_bussiness = this.dataFile.desc_bussiness;         
          this.generalInfo.plafon = this.dataFile.plafon;               
          
          this.overlay = false;
        } else {
          this.$showToast("error", "Sorry", response.data.data.message);
          this.overlay = false;
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.response.data.message);
        this.overlay = false;
      }
    },
    getUserData() {
      const savedUserData = localStorage.getItem("userData");
      if (savedUserData) {
        this.userData = JSON.parse(savedUserData);
      }
    },
    openModal(type: number, item = null) {
      if (type == 1) {
        this.insertAttch = true;
      } else if (type == 2) {
        this.attachFile.id = item.id;
        this.attachFile.file_id = item.file_id;
        this.attachFile.name = item.name;
        this.updateAttch = true;
      } else if (type == 3) {
        this.updateDataNote.id = item.id;
        this.updateDataNote.file_id = item.file_id;
        this.updateDataNote.note = item.note;
        this.isUpdateNote = true;
      } else if (type == 4) {
        this.isUpdateGeneralInfo = true;
      }
    },
    closeModal(type: number) {
      if (type === 1) {
        this.resetAttch();
        this.insertAttch = false;
      } else if (type === 2) {
        this.updateAttch = false;
      } else if (type === 3) {
        this.resetNote();
        this.updateNote = false;
      } else if (type == 4) {
        this.isUpdateGeneralInfo = false;
      }
    },

    //=>edit general info
    async updateGeneralInfo() {
      try {
        this.overlay = true;
        const formData = new FormData();
        formData.append("name", this.generalInfo.name);
        formData.append("plafon", this.generalInfo.plafon.replace(/\D/g, ""));
        formData.append("type_bussiness", this.generalInfo.type_bussiness);
        formData.append("desc_bussiness", this.generalInfo.desc_bussiness);
        formData.append("_method", "PUT");

        const response = await mainURL.post(
          `/user/edit-general-info/${this.generalInfo.id}`,
          formData
        );
        if (response.status === 200) {
          this.overlay = false;
          this.getDetailFile(this.fileId);
          this.isUpdateGeneralInfo = false;
          this.$showToast("success", "Success", response.data.message);
        } else {
          this.overlay = false;
          this.getDetailFile(this.fileId);
          this.isUpdateGeneralInfo = false;
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.isUpdateGeneralInfo = false;
        this.overlay = false;
        this.getDetailFile(this.fileId);
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },

    //=>NOTE section
    async insertNote() {
      try {
        this.overlay = true;

        if (this.dataNote.note == null) {
          this.$showToast("error", "Sorry", "Note cannot be empty");
          this.overlay = false;
          return;
        }

        const formData = new FormData();
        formData.append("file_id", this.dataNote.file_id);
        formData.append("note", this.dataNote.note);
        formData.append("_method", "POST");

        const response = await mainURL.post("/user/note", formData);
        if (response.status === 200) {
          this.resetNote();
          this.overlay = false;
          this.getDetailFile(this.fileId);
          this.$showToast("success", "Success", response.data.message);
        } else {
          this.resetNote();
          this.overlay = false;
          this.getDetailFile(this.fileId);
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
          this.resetNote();
        this.overlay = false;
        this.getDetailFile(this.fileId);
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
    async updateNote() {
      try {
        this.overlay = true;
        const formData = new FormData();
        formData.append("file_id", this.updateDataNote.file_id);
        formData.append("note", this.updateDataNote.note);
        formData.append("_method", "PUT");

        const response = await mainURL.post(
          `/user/note/${this.updateDataNote.id}`,
          formData
        );
        if (response.status === 200) {
          this.overlay = false;
          this.getDetailFile(this.fileId);
          this.isUpdateNote = false;
          this.$showToast("success", "Success", response.data.message);
        } else {
          this.overlay = false;
          this.getDetailFile(this.fileId);
          this.isUpdateNote = false;
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.isUpdateNote = false;
        this.overlay = false;
        this.getDetailFile(this.fileId);
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
    async deleteNote(id: any) {
      try {
        this.overlay = true;
        const confirmDelete = window.confirm(
          "Apakah Anda yakin ingin menghapus data? Data akan terhapus secara permanen."
        );
        if (!confirmDelete) return;

        const response = await mainURL.delete(`/user/note/${id}`);

        if (response.status === 200) {
          this.overlay = false;
          this.getDetailFile(this.fileId);
          this.$showToast("success", "Berhasil", response.data.message);
        } else {
          this.overlay = false;
          this.getDetailFile(this.fileId);
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.overlay = false;
        this.getDetailFile(this.fileId);
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
    resetNote() {
      this.dataNote = {
        file_id: this.$route.params.fileId,
        note: null,
        isRead: null,
      };
    },

    //=>approval section
    async changeApproval(id: any) {
      try {
        this.overlay = true;
        const response = await mainURL.get(`/user/change-phase-approve/${id}`);

        if (response.status === 200) {
          this.overlay = false;
          this.getDetailFile(this.fileId);
          this.$showToast("success", "Berhasil", response.data.message);
        } else {
          this.overlay = false;
          this.getDetailFile(this.fileId);
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.overlay = false;
        this.getDetailFile(this.fileId);
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },

    ///////////////////////////////////////////////////////////////////////////////////
    //Attachmen upload
    handleFileChange(event: { target: { files: any[]; value: null } }) {
      const selectedFile = event.target.files[0];
      const allowedTypes = [
        "image/jpeg", // for .jpeg and .jpg
        "image/png",
      ];
      if (selectedFile && allowedTypes.includes(selectedFile.type)) {
        this.attachFile.path = selectedFile;
      } else {
        this.$showToast(
          "error",
          "Error",
          "Hanya file JPG, JPEG, dan PNG yang diizinkan."
        );
        event.target.value = null;
      }
    },
    resetAttch() {
      this.attachFile = {
        id: null,
        file_id: this.$route.params.fileId,
        name: null,
        path: null,
        note: null,
        isSecret: false,
      };
    },
    async insertAttachment() {
      try {
        this.overlay = true;
        const formData = new FormData();
        formData.append("file_id", this.attachFile.file_id);
        formData.append("name", this.attachFile.name);
        formData.append("path", this.attachFile.path);
        if (this.dataFile.phase == 2) {
          formData.append("isSecret", this.attachFile.isSecret);
        }
        formData.append("_method", "POST");

        const config = {
          onUploadProgress: (progressEvent) => {
            try {
              this.uploadProgress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
            } catch (error) {
              console.error("Error calculating progress:", error);
            }
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };

        const response = await mainURL.post(
          "/user/add-attach",
          formData,
          config
        );
        if (response.status === 200) {
          this.overlay = false;
          this.closeModal(1);
          this.getDetailFile(this.fileId);
          this.uploadProgress = null;
          this.$showToast("success", "Success", response.data.message);
        } else {
          this.overlay = false;
          this.closeModal(1);
          this.uploadProgress = null;
          this.getDetailFile(this.fileId);
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.closeModal(1);
        this.getDetailFile(this.fileId);
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
    async editAttachment() {
      try {
        this.overlay = true;
        const formData = new FormData();
        formData.append("file_id", this.attachFile.file_id);
        formData.append("name", this.attachFile.name);
        if (this.attachFile.path != null) {
          formData.append("path", this.attachFile.path);
        }
        if (this.dataFile.phase == 2) {
          formData.append("isSecret", this.attachFile.isSecret);
        }
        formData.append("_method", "PUT");

        const config = {
          onUploadProgress: (progressEvent) => {
            try {
              this.uploadProgress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
            } catch (error) {
              console.error("Error calculating progress:", error);
            }
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };

        const response = await mainURL.post(
          `/user/edit-attach/${this.attachFile.id}`,
          formData,
          config
        );
        if (response.status === 200) {
          this.overlay = false;
          this.closeModal(2);
          this.getDetailFile(this.fileId);
          this.uploadProgress = null;
          this.$showToast("success", "Success", response.data.message);
        } else {
          this.overlay = false;
          this.closeModal(2);
          this.uploadProgress = null;
          this.getDetailFile(this.fileId);
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.closeModal(2);
        this.getDetailFile(this.fileId);
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
    async deleteAttachment(id: any) {
      try {
        this.overlay = true;
        const confirmDelete = window.confirm(
          "Apakah Anda yakin ingin menghapus data? Data akan terhapus secara permanen."
        );
        if (!confirmDelete) return;

        const response = await mainURL.delete(`/user/delete-attach/${id}`);

        if (response.status === 200) {
          this.overlay = false;
          this.getDetailFile(this.fileId);
          this.$showToast("success", "Berhasil", response.data.message);
        } else {
          this.overlay = false;
          this.getDetailFile(this.fileId);
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.overlay = false;
        this.getDetailFile(this.fileId);
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
    ///////////////////////////////////////////////////////////////////////////////////
  },
  mounted() {
    this.checkMobile();
    this.getUserData();
    this.getDetailFile(this.fileId);
  },
};
</script>

<style scoped>
.user-comment {
  background-color: #e6f7ff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  position: relative;
}

.ellipsis-icon {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
}

.comment-content {
  position: relative;
}
</style>
