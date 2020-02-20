import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { Section } from '../common/Section';
import { useRecordContext } from 'context';
import { adminInterfaceConfig } from 'config/admin';
import {
    PUBLICATION_TYPE_CREATIVE_WORK,
    PUBLICATION_TYPE_DESIGN,
    NTRO_SUBTYPE_CW_DESIGN_ARCHITECTURAL_WORK,
} from 'config/general';

export const AdminSection = ({ disabled = false }) => {
    const { record } = useRecordContext();

    /*
     *  Disbale below line in favour of #171299373
     */
    // const displayType =
    //     record.rek_display_type === PUBLICATION_TYPE_CREATIVE_WORK &&
    //     !!record.rek_subtype &&
    //     record.rek_subtype === NTRO_SUBTYPE_CW_DESIGN_ARCHITECTURAL_WORK
    //         ? PUBLICATION_TYPE_DESIGN
    //         : record.rek_display_type;
    const cards = useRef(adminInterfaceConfig[record.rek_display_type].admin());

    return <Section cards={cards.current} disabled={disabled} />;
};

AdminSection.propTypes = {
    disabled: PropTypes.bool,
};

export default React.memo(AdminSection);
