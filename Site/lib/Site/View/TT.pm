package Site::View::TT;
use Moose;
use namespace::autoclean;

extends 'Catalyst::View::TT';

__PACKAGE__->config(
    TEMPLATE_EXTENSION => '.tt',
    render_die => 1,
    ENCODING           => 'UTF-8',
    WRAPPER            => 'site/wrapper.tt',
    static_root        => '/static',
);

=head1 NAME

Site::View::TT - TT View for Site

=head1 DESCRIPTION

TT View for Site.

=head1 SEE ALSO

L<Site>

=head1 AUTHOR

Nicholas McCamey,,,

=head1 LICENSE

This library is free software. You can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;
